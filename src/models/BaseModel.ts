export class BaseModel<T> {
    constructor(props?: T) {
        this.update(props);
    }

    update(props?: any) {
        if (props) {
            for (const k in props) {
                // @ts-ignore
                this[k] = props[k];
            }
        }
    }
}
