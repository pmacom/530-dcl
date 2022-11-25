import { Dash_TriggerZone, Dash_Tweaker, Dash_Wait } from "dcldash";
import { ArticleViewer } from "./articleViewer/viewer";

const scene = new Entity()
    scene.addComponent(new GLTFShape('models/scene.glb'))
    scene.addComponent(new Transform({
        position: new Vector3(160.040, 0.000, 150),
    }))
    engine.addEntity(scene)
Dash_Tweaker(scene)

// const sceneCollider= new Entity()
//     sceneCollider.addComponent(new GLTFShape('models/scene_collider.glb'))
//     sceneCollider.addComponent(new Transform({
//         position: new Vector3()
//     }))
//     engine.addEntity(sceneCollider)


const triggerZone = new Dash_TriggerZone()
    triggerZone.getComponentOrCreate(Transform).position = new Vector3(219.39,1.77,167.45)
    triggerZone.getComponentOrCreate(Transform).scale = new Vector3(5,5,5)
    triggerZone.enable()
    triggerZone.enableDebug()
    triggerZone.onEnter = () => {
        // ContentManger.randomlyPositionTweets()
    }
    triggerZone.onExit = () => {}


Dash_Wait(() => {
    log('Hydrate: game.ts called')
    const articleViewer = ArticleViewer
    articleViewer.init()
    articleViewer.entity.addComponentOrReplace(new Transform({
        position: new Vector3(160.040, 15.000, 150),
    }))
}, 2)
