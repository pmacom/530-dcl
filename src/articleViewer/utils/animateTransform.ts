import { Dash_OnUpdateFrame, Dash_OnUpdateFrame_Instance } from "dcldash"

interface IAnimationTranfsormSettings {
    position?: {
        x?: number
        y?: number
        z?: number
    }
    scale?: {
        x?: number
        y?: number
        z?: number
    }
    rotation?: {
        x?: number
        y?: number
        z?: number
    }
}

interface IAnimationTransform {
    name?: string
    duration?: number
    timer?: number
    ease?: (v: number)=>number
    startTransform?: IAnimationTranfsormSettings
    lookAt?: Vector3 | null,
    position?: {
        x?: number
        y?: number
        z?: number
    }
    scale?: {
        x?: number
        y?: number
        z?: number
    }
    rotation?: {
        x?: number
        y?: number
        z?: number
    }
}

declare const Map: any

class AnimateTransformInstance {
    private mappings: typeof Map = new Map()
    private animator: Dash_OnUpdateFrame_Instance = Dash_OnUpdateFrame.add((dt: number) => this.animate(dt))

    add(entity: Entity, duration: number, properties: IAnimationTransform, ease?: (v:number)=>number, delay: number = 0){
        const current =  this.mappings.has(properties.name) ? this.mappings.get(properties.name) : null
        properties.duration = !!current && current.timer < current.duration
            ? current.duration - current.timer
            : duration
        properties.name = entity.uuid
        properties.timer = this.mappings.has(properties.name) ? this.mappings.get(properties.name).timer : delay*-1 
        properties.ease = ease
        const t = entity.getComponentOrCreate(Transform)
        const pc = t.position.clone()
        const sc = t.scale.clone()
        const rc = t.rotation.clone()
        properties.startTransform = {
            position: { x: pc.x, y: pc.y, z: pc.z },
            scale: { x: sc.x, y: sc.y, z: sc.z },
            rotation: { x: rc.x, y: rc.y, z: rc.z },
        }
        this.mappings.set(properties.name, properties)

        log({ properties })
        this.animator.start()
    }

    animate(dt: number){
        if(this.mappings.size == 0){ this.animator.stop(); return }

        this.mappings.forEach((mapping: IAnimationTransform) => {
            log('animating')
            const { name, position, scale, rotation, startTransform: st, ease, lookAt } = mapping
            let { duration = 0, timer = 0 } = mapping
            const px = position?.x
            const py = position?.y
            const pz = position?.z
            const sx = scale?.x
            const sy = scale?.y
            const sz = scale?.z
            const rx = rotation?.x
            const ry = rotation?.y
            const rz = rotation?.z
            const entity = engine.entities[`${name}`]

            if(entity){
                mapping.timer = timer+dt
                const t = entity.getComponentOrCreate(Transform)
                log(st)
                if(timer < 0) return
                if(timer! >= duration){
                    this.mappings.delete(name)
                    if(px && st?.position?.x){ t.position.x = px }
                    if(py && st?.position?.y){ t.position.y = py }
                    if(pz && st?.position?.z){ t.position.z = pz }
                    if(sx && st?.scale?.x){ t.scale.x = sx }
                    if(sy && st?.scale?.y){ t.scale.y = sy }
                    if(sz && st?.scale?.z){ t.scale.z = sz }
                    if(rx && st?.rotation?.x){ t.rotation.eulerAngles.x = rx }
                    if(ry && st?.rotation?.y){ t.rotation.eulerAngles.y = ry }
                    if(rz && st?.rotation?.z){ t.rotation.eulerAngles.z = rz }
                    return
                }

                

                let p = timer/duration // percent
                if(px && (st?.position?.x || (typeof st?.position?.x == 'number' && st?.position?.x == 0))){
                    t.position.x = Scalar.Lerp(st?.position?.x, px, ease ? ease(p): p) }
                if(py && (st?.position?.y || (typeof st?.position?.y == 'number' && st?.position?.y == 0))){
                    t.position.y = Scalar.Lerp(st?.position?.y, py, ease ? ease(p): p) }
                if(pz && (st?.position?.z || (typeof st?.position?.z == 'number' && st?.position?.z == 0))){
                    t.position.z = Scalar.Lerp(st?.position?.z, pz, ease ? ease(p): p) }

                if(sx && (st?.scale?.x || (typeof st?.scale?.x == 'number' && st?.scale?.x == 0))){
                    t.scale.x = Scalar.Lerp(st?.scale?.x, sx, ease ? ease(p): p) }
                if(sy && (st?.scale?.y || (typeof st?.scale?.y == 'number' && st?.scale?.y == 0))){
                    t.scale.y = Scalar.Lerp(st?.scale?.y, sy, ease ? ease(p): p) }
                if(sz && (st?.scale?.z || (typeof st?.scale?.z == 'number' && st?.scale?.z == 0))){
                    t.scale.z = Scalar.Lerp(st?.scale?.z, sz, ease ? ease(p): p) }
                
                if(lookAt){ t.lookAt(lookAt); return }

                if(rx || ry || rz){
                    let _rx = (st?.rotation?.x || (typeof st?.rotation?.x == 'number' && st?.rotation?.x == 0)) ? st.rotation.x : 0
                    let _ry = (st?.rotation?.y || (typeof st?.rotation?.y == 'number' && st?.rotation?.y == 0)) ? st.rotation.y : 0
                    let _rz = (st?.rotation?.z || (typeof st?.rotation?.z == 'number' && st?.rotation?.z == 0)) ? st.rotation.z : 0
                    t.rotation.setEuler(
                        rx ? Scalar.Lerp(_rx, rx, (ease ? ease(p): p)): _rx,
                        ry ? Scalar.Lerp(_ry, ry, (ease ? ease(p): p)): _ry,
                        rz ? Scalar.Lerp(_rx, rz, (ease ? ease(p): p)): _rz,
                    )
                }
                // if(rx && st?.rotation?.x){ t.rotation.eulerAngles.x = Scalar.Lerp(st?.rotation?.x, rx, ease ? ease(p): p) }
                // if(ry && st?.rotation?.y){ t.rotation.eulerAngles.y = Scalar.Lerp(st?.rotation?.y, ry, ease ? ease(p): p) }
                // if(rz && st?.rotation?.z){ t.rotation.eulerAngles.z = Scalar.Lerp(st?.rotation?.z, rz, ease ? ease(p): p) }
            }
        })
    }
}

export const AnimateTransform = new AnimateTransformInstance()
