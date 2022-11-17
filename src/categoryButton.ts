export class CategoryButton {
    public entity: Entity = new Entity()
    constructor(public tagName: string){
        this.entity.addComponent(new BoxShape())
        this.entity.addComponent(new Transform({
            position: new Vector3()
        }))
        this.entity.addComponent(new OnPointerDown(() => {
            log('You are sorting by', this.tagName)
        }))
    }
}