import { ArticlePanel } from "./articlePanel"
import { ArticleViewMode } from "./modes/base"
import { ArticleViewMode_Default } from "./modes/default"

declare const Map: any

class Positioner_Instance {
    public mode: ArticleViewMode = ArticleViewMode_Default

    center(articlePanels: ArticlePanel[]){
        this.mode.center(articlePanels)
    }
    orbit(articlePanels: ArticlePanel[]){
        this.mode.orbit(articlePanels)
    }
}

export const Positioner = new Positioner_Instance()




/** Old code
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
*/