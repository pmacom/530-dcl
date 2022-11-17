import { API } from "./api/api"
import { CategoryButton } from "./categoryButton"

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

    constructor(){ 

    }

    start(){
        this.entity.addComponent(new Transform({
            position: new Vector3(218.03,0.88,147.68)
        }))
        API.getData()
        engine.addEntity(this.entity)

        this.makeButtons()
    }

    makeButtons(){
        const padding = 2
        categories.forEach((category: string, index: number) => {
            log({ category })
            const button = new CategoryButton(category)
            button.entity.addComponentOrReplace(new Transform({
                position: new Vector3(0,0,index+(padding*index))
            }))
            button.entity.setParent(this.entity)
        })
    }
}

export const ContentManger = new ContentManger_Instance()
