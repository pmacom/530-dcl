import { Dash_Material } from "dcldash"
import { API } from "src/api/api"

// const testTexture = new Texture('images/testTweet.png')
const testTexture = new Texture('https://tweetimages.s3.amazonaws.com/images/2022-11-14T23%3A17%3A26.500Z.png')


export class TweetDisplay {
    public entity: Entity = new Entity()
    private tweets: TweetPanel[] = []

    constructor(){
        this.entity.addComponent(new Transform({
            position: new Vector3(153.00, 0.88, 143.00)
        }))
        engine.addEntity(this.entity)

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
}

const padding = 1.5
class TweetPanel {
    public entity: Entity = new Entity()
    public thumbnailEntity: Entity = new Entity()
    public descriptionEntity: Entity = new Entity()
    public description: TextShape = new TextShape()
    public tags: string[] = []

    constructor(public data: any, index: number){
        this.entity.addComponent(new PlaneShape())
        this.entity.addComponent(new Transform({
            position: new Vector3(index+(padding*index), 0, 0),
            scale: new Vector3().setAll(2)
        }))
        this.entity.addComponent(new OnPointerDown(() => {
            openExternalURL(data.url)
        }))
        // this.entity.addComponent(new Billboard(false, true, false))

        // this.tags.push(tags[Math.floor(Math.random()*tags.length)])
        // this.tags.push(tags[Math.floor(Math.random()*tags.length)])

        this.renderThumbnail()
        this.renderDescription()
    }

    renderThumbnail(){
        const material = new Material()
        let height = 1
        let width = 1
        if(this.data.thumbnail?.url){
            material.albedoTexture = testTexture
            material.emissiveTexture = testTexture
            material.emissiveIntensity = .8
            material.specularIntensity = 0
            material.emissiveColor = Color3.White()
            height = 919 // this.data.thumbnail.height
            width = 598 // this.data.thumbnail.width
            height = Scalar.InverseLerp(0, width, height)
        }
        this.thumbnailEntity.addComponent(material)
        const thumbnailShape = new PlaneShape()
        thumbnailShape.withCollisions = false
        this.thumbnailEntity.addComponent(thumbnailShape)
        this.thumbnailEntity.addComponent(new Transform({
            position: new Vector3(0,1,0),
            scale: new Vector3().set(1, -1 * height, 1),
        }))
        this.thumbnailEntity.setParent(this.entity)
    }

    renderDescription(){
        this.descriptionEntity.setParent(this.entity)
        const description = new TextShape()
        const transform = this.entity.getComponent(Transform)
        this.descriptionEntity.addComponentOrReplace(description)
        this.descriptionEntity.addComponentOrReplace(new Transform({
            position: new Vector3(0,0,.0005),
            rotation: new Quaternion().setEuler(0, 180, 0),
            // position: new Vector3(0,0,(transform.scale.z/2*-1)+.01),
            scale: new Vector3().setAll(1/100)
        }))
        description.value = this.tags.join("\n")
        description.width = 100
        description.height = 100
        description.textWrapping = true
        description.hTextAlign = "left"
        description.vTextAlign = "top"
        description.fontSize = 40
        const p = 10
        description.paddingTop = p
        description.paddingRight= p
        description.paddingBottom = p
        description.paddingLeft = p
    }
}