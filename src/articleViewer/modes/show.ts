import { Dash_Ease, Dash_Tweaker } from "dcldash";
import { ArticlePanel } from "../articlePanel";
import { AnimateTransform } from "../utils/animateTransform";
import { _Utils_Chunk } from "../utils/chunk";
import { ArticleViewMode } from "./base";

declare const Map: any

class ArticleViewMode_Default_Instance implements ArticleViewMode{
    stage(article: ArticlePanel){
        log('ArticleViewMode: Default: Stage', article)
    }
    center(articles: ArticlePanel[]){
        log('ArticleViewMode: Default: Center', articles)
        articles.forEach((article: ArticlePanel, index: number) => {
            log('ArticleViewMode: Default: Orbit: Article', article)
            const { x, y, z } = distributedSpherePoint(articles.length+1, index, 5)
            const t = article.entity.getComponentOrCreate(Transform)
            const delay = .02
            const speed = 1
            const anim = Dash_Ease.easeOutQuad
            AnimateTransform.add(article.entity, speed, {
                lookAt: new Vector3(0,0,0),
                position: {
                    x, y, z
                },
                // scale: {
                //     x: 1,
                //     y: 1,
                //     z: 1,
                // }
            }, anim, index * delay)
            t.lookAt(new Vector3(1,1,1))
        })
    }
    orbit(articles: ArticlePanel[]){
        log('ArticleViewMode: Default: Orbit', articles)
        articles.forEach((article: ArticlePanel, index: number) => {
            log('ArticleViewMode: Default: Orbit: Article', article)
            
            // const {x, y, z} = fibonacciSphere(articles.length, index, 10)
            const { x, y, z } = distributedCylinderPoint(
                articles.length,
                index,
                10,
                20,
                90
            )
            const t = article.entity.getComponentOrCreate(Transform)
            // t.scale = new Vector3().setAll(0)
            const delay = .02
            const speed = 2
            const anim = Dash_Ease.easeOutElastic

            const rotation = t.rotation.clone()


            AnimateTransform.add(article.entity, speed, {
                lookAt: new Vector3(0,0,0),
                position: {
                    x, y, z
                },
                // scale: {
                //     x: 1,
                //     y: 1,
                //     z: 1,
                // }
            }, anim, index * delay)
            // t.lookAt(new Vector3(x,y,z))
        })
    }
}

function randomSpherePoint(x0: number,y0: number,z0: number, radius: number){
    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(2 * v - 1);
    var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
    var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
    var z = z0 + (radius * Math.cos(phi));
    return [x,y,z];
}

// point is the index
function distributedSpherePoint(numPoints: number, point: number, size: number) {
    const rnd = 1
    const offset = 2 / numPoints
    const increment = Math.PI * (3 - Math.sqrt(5))
  
    const y = ((point * offset) - 1) + (offset / 2)
    const r = Math.sqrt(1 - Math.pow(y, 2))
  
    const phi = (point + rnd) % numPoints * increment
  
    const x = Math.cos(phi) * r
    const z = Math.sin(phi) * r
  
    return new Vector3(x*size, y*size, z*size)
}

function distributedCylinderPoint(
    numPoints: number,
    point: number,
    cols: number,
    radius: number,
    degrees: number,
){
    const max = Angle.FromDegrees(degrees).radians()
    const interval = max / cols
    const height = Math.floor(point/cols)
    const gap = 1
    const rads = interval * (point % cols)

    return new Vector3(
        radius * Math.cos(rads),
        height + (gap*height),
        radius * Math.sin(rads),
    )
}

export const ArticleViewMode_Default = new ArticleViewMode_Default_Instance()