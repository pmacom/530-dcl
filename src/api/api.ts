// const url = 'https://fivethirtysociety.herokuapp.com/api/articles?pagination%5Bpage%5D=1&pagination%5BpageSize%5D=100'
const url = 'https://fivethirtysociety.herokuapp.com/api/articles'

class API_Instance {
    public data: any = []
    private callbacks: ((data: any)=>void)[] = []

    getData(){
        executeTask(async () => {
            try {
              let response = await fetch(url)
              let json = await response.json()
              this.parseData(json)
              this.callbacks.forEach(callback => { callback(this.data) })
            } catch {
              log("failed to reach URL")
            }
          })
    }

    parseData(json: any){
        const { data } = json
        log('ALL DATA', data)
        data.forEach((entry:any) => {
            const output = {
                thumbnail: entry.attributes?.thumbnails[0],
                contentCreatorName: entry.attributes.contentCreatorName,
                description: entry.attributes.description,
                url: entry.attributes.url
            }
            this.data.push(output)
        })
        log(this.data)
    }

    addCallback(callback: (data: any)=>void){
        this.callbacks.push(callback)
    }
}

export const API = new API_Instance()