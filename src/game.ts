import { TweetDisplay } from "./components/tweetDisplay";
import { ContentManger } from "./contentManager";


const tweetDisplay = new TweetDisplay()


ContentManger.start()


// class TestCube {
//     public entity: Entity = new Entity()
//     constructor(){
//         this.entity.addComponent(new BoxShape())
//         this.entity.addComponent(new Transform({
//             position: new Vector3(218.03,0.88,147.68)
//         }))
//         engine.addEntity(this.entity)
//     }
// }


// const cubeTest1 = new TestCube()