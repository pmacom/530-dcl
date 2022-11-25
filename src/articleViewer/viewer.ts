import { Dash_Wait } from "dcldash"
import { Data_Manager } from "./api"
import { ArticlePanel } from "./articlePanel"
import { Positioner } from "./positioner"
import { ArticleData } from "./types"

declare const Map: any

class ArticleViewer_Controller {
    public entity: Entity = new Entity()
    private articlePanels: ArticlePanel[] = []
    private displayCount: number = 100

    constructor(){}

    init(){
        log('Hydrate: Init called')
        log('Article Viewer: Initializing the viewer')
        this.entity.addComponentOrReplace(new Transform())
        this.entity.addComponentOrReplace(new SphereShape())
        engine.addEntity(this.entity)

        Data_Manager.addCallback((articles: ArticleData[]) => this.hydratePanels(articles))
        Data_Manager.fetchAllArticles()

        for(let i=0; i<this.displayCount; i++){
            const panel = new ArticlePanel()
            panel.entity.setParent(this.entity)
            this.articlePanels.push(panel)
        }
    }

    hydratePanels(allArticleData: typeof Map){
        log('Hydrating Panels')
        let index = 0;
        allArticleData.forEach((articleData: ArticleData) => {
            if(index >= this.displayCount) return
            index+=1
            const panel = this.articlePanels[index]
            if(panel) panel.loadData(articleData)
        })
        Positioner.orbit(this.articlePanels)


        Dash_Wait(() => {
            Positioner.center(this.articlePanels)
        }, 4)



        Dash_Wait(() => {
            Positioner.orbit(this.articlePanels)
        }, 10)


        Dash_Wait(() => {
            Positioner.center(this.articlePanels)
        }, 20)
    }
}

export const ArticleViewer = new ArticleViewer_Controller()