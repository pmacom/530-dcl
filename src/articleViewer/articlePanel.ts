import { ArticleData } from "./types"

export class ArticlePanel {
    public entity: Entity = new Entity()

    constructor(){
        log('Article Panel: Creating a panel')
        this.entity.addComponent(new Transform())
        this.entity.addComponent(new PlaneShape())
    }

    loadData(data: ArticleData){
        log('Article Panel: Loading Data', data)
    }
}