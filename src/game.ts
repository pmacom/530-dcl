import { Dash_TriggerZone, Dash_Tweaker } from "dcldash";
import { TweetDisplay } from "./components/tweetDisplay";
import { ContentManger } from "./contentManager";


const tweetDisplay = new TweetDisplay()


ContentManger.start()



const scene = new Entity()
scene.addComponent(new GLTFShape('models/scene.glb'))
scene.addComponent(new Transform({
    position: new Vector3()
}))
engine.addEntity(scene)



const sceneCollider= new Entity()
sceneCollider.addComponent(new GLTFShape('models/scene_collider.glb'))
sceneCollider.addComponent(new Transform({
    position: new Vector3()
}))
engine.addEntity(sceneCollider)





const triggerZone = new Dash_TriggerZone()
triggerZone.getComponentOrCreate(Transform).position = new Vector3(219.39,1.77,167.45)
triggerZone.getComponentOrCreate(Transform).scale = new Vector3(5,5,5)
triggerZone.enable()
triggerZone.enableDebug()
triggerZone.onEnter = () => {
    ContentManger.randomlyPositionTweets()
}
triggerZone.onExit = () => {
    log('I HAVE LEFT THIS BITCH')
}



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