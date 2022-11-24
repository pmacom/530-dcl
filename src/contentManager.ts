import { Dash_AnimationQueue, Dash_Ease } from "dcldash"
import { API } from "./api/api"
import { CategoryButton } from "./categoryButton"
import { TweetPanel } from "./components/tweetDisplay"

const categories = [
    "modeling",
    "tech",
    "metaverse",
    "coding",
    "engines",
    "events"
]

class ContentManger_Instance {
    public entity: Entity = new Entity()
    public content: any[] = []
    private tweets: TweetPanel[] = []

    constructor(){
        API.addCallback((data: any) => {
            log({ data })
            data.forEach((tweet:any, index: number) => {
                const t = new TweetPanel(tweet, index)
                this.tweets.push(t)
                t.entity.setParent(this.entity)
            })
            log('The Tweet Display has this data now', data)
        })
    }

    start(){
        this.entity.addComponent(new Transform({ position: new Vector3(218.03,0.88,147.68) }))
        API.getData()
        engine.addEntity(this.entity)
        this.makeButtons()
    }

    makeButtons(){
        const padding = 2
        categories.forEach((category: string, index: number) => {
            const button = new CategoryButton(category)
            button.entity.addComponentOrReplace(new Transform({
                position: new Vector3(0,0,index+(padding*index))
            }))
            button.entity.setParent(this.entity)
        })
    }

    randomlyPositionTweets(){
        log('Re-shuffling all of the tweet locations')
        this.tweets.forEach((tweet: TweetPanel) => {
            const transform = tweet.entity.getComponent(Transform)
            const startPosition = transform.position.clone()
            const endPosition = new Vector3(
                Scalar.RandomRange(0, 20),
                Scalar.RandomRange(0, 20),
                Scalar.RandomRange(0, 20),
            )
            Dash_AnimationQueue.add({
                duration: 1,
                data: { entity: tweet.entity, startPosition, endPosition },
                onFrame: (progress, data ) => {
                    const { entity } = data
                    const t = entity.getComponent(Transform).position = new Vector3(
                        Scalar.Lerp(startPosition.x, endPosition.x, Dash_Ease.easeOutQuad(progress)),
                        Scalar.Lerp(startPosition.y, endPosition.y, Dash_Ease.easeOutQuad(progress)),
                        Scalar.Lerp(startPosition.z, endPosition.z, Dash_Ease.easeOutQuad(progress)),
                    )
                }
            })
        })
    }
}

export const ContentManger = new ContentManger_Instance()
