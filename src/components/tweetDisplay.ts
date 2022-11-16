import { Dash_Material } from "dcldash"
import { API } from "src/api/api"

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

    constructor(public data: any, index: number){
        this.entity.addComponent(new PlaneShape())
        this.entity.addComponent(new Transform({
            position: new Vector3(index+(padding*index), 0, 0),
            scale: new Vector3().setAll(2)
        }))
        this.entity.addComponent(new OnPointerDown(() => {
            openExternalURL(data.url)
        }))
        this.entity.addComponent(new Billboard(false, true, false))

        this.renderThumbnail()
        this.renderDescription()
    }

    renderThumbnail(){
        const material = new Material()
        let height = 1
        let width = 1
        if(this.data.thumbnail?.url){
            const texture = new Texture(this.data.thumbnail.url)
            material.albedoTexture = texture
            material.emissiveTexture = texture
            material.emissiveIntensity = 1
            material.specularIntensity = 0
            height = this.data.thumbnail.height
            width = this.data.thumbnail.width
            height = Scalar.InverseLerp(0, width, height)
        }
        this.thumbnailEntity.addComponent(material)
        this.thumbnailEntity.addComponent(new PlaneShape())
        this.thumbnailEntity.addComponent(new Transform({
            position: new Vector3(0,.5,.1),
            scale: new Vector3().set(1, -1 * height, 1),
        }))
        this.thumbnailEntity.setParent(this.entity)
    }

    renderDescription(){
        let size = .1
        this.descriptionEntity.addComponent(this.description)
        this.descriptionEntity.addComponent(new Transform({
            position: new Vector3(0,0,.02),
            scale: new Vector3().set(size, size, size),
            rotation: new Quaternion().setEuler(0, 180, 0)
        }))
        this.descriptionEntity.setParent(this.entity)

        this.description.value = 'Lorem Ipsuuum'
        this.description.color = Color3.Black()
        this.description.fontSize = 7
        this.description.hTextAlign = "right"
        this.description.vTextAlign = "top"
        this.description.height = 10
        this.description.width = 10
    }
}