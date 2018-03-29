
export default class Base<P> {
    toJS() : object {
        const self = this;
        const maped = {};
        Object.getOwnPropertyNames(self).forEach(name => {
            const child = self[name];
            if(child instanceof Base) {
                maped[name] = child.toJS();
            } else {
                maped[name] = child;
            }
        });
        return maped;
    }
    merge( params:Partial<P>) : P {
        const newInstance:P = new (<any>this.constructor) as P;
        Object.assign(newInstance, this, params);
        return newInstance;
    }
}