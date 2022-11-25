import { ArticleCategories, ArticleData, ArticleRawData } from './types'

/**
 * The API Manager is in charge of controlling the fetching and storing
 * of the article data in the scene. 
 * 
 * - Any response(s) from the API are added to a centralized mapping
 * - Queries to the data are done here as well (Example: Give me all of the articles with X attributes)
 * - Callbacks can be added that execute whenever article data is added into the system
 */
declare const Map: any

/**
 * Here we are establishing some of the routes that we will be hitting.
 * - Centralizing them into one location will make it easier to point this viewer to other feeds
 * - Making these functions instead of static strings will allow us to pass params more easily
 */
export const Article_API_Routes = {
    current: () => 'https://fivethirtysociety.herokuapp.com/api/articles',
    all: () => 'https://fivethirtysociety.herokuapp.com/api/articles?pagination%5Bpage%5D=1&pagination%5BpageSize%5D=100'
}

class Articles_Manager_Instance {

    // Holds all article data that has been retrieved from the api
    public articles: typeof Map = new Map()
    
    // Any registered callback functions will get called when article data has been updated
    private callbacks: ((data: any)=>void)[] = []
    public addCallback(callback: (data: typeof Map)=>void){ this.callbacks.push(callback) }

    // Public functions to get data from the API
    public fetchCurrentArticles(){ this.fetchData(Article_API_Routes.current()) }
    public fetchAllArticles(){ this.fetchData(Article_API_Routes.all()) }

    // Internal function to handle the API response and formatting of data
    private fetchData(url: string){
        log('Hydrating fetch data')
        executeTask(async () => {
            try {
                let response = await fetch(url)
                let json: ArticleRawData[] = await response.json()
                this.parseResponse(json)
                log('Articles API: Checking Callback count:', this.callbacks.length)
                this.callbacks.forEach(callback => { callback(this.articles) })
            } catch { log("failed to reach URL") }
        })
    }

    // Insert the new data from the API into this class's articles mapping
    private parseResponse(json: any){
        json.data.forEach((article:any) => this.articles.set(article.id, this.parseArticle(article)))
        log('API Added Articles', this.articles.size)
    }

    // Tidy up the data (THIS IS NOT NECESSARY, but useful)
    //  - It makes it easier/cleaner to extract values from article data elsewhere in your code
    //  - If the data from the API changes at all, you only need to change it once, here. Below.
    private parseArticle = (articleData: any): ArticleData =>  ({
        id: articleData.id,
        thumbnail: articleData.attributes?.thumbnails[0],
        contentCreatorName: articleData.attributes.contentCreatorName,
        description: articleData.attributes.description,
        url: articleData.attributes.url,
        category: _Get_Random_Category(),
    })
}

/**
 * We export one single instance of this class, so that it behaves like a Singleton.
 * Any code can reference this single class, and it will only get this one instance.
 */
export const Data_Manager = new Articles_Manager_Instance()

/** Temporary helper functions  */
const _Get_Random_Category = () => ArticleCategories[Math.floor(Math.random()*ArticleCategories.length)]
 