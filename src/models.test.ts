 import * as Immutable from "immutable";

//immutable使うか思案中

interface CounterProps {
    value?: number;
    status: string;
}
class Base<P> {
    constructor(params?:P) {
        Object.assign(this, params);
    }
    toJson() : string {
        return JSON.stringify(this);
    }
}
export class Counter extends Base<CounterProps> {
    readonly value: number;
    readonly status: string;

    constructor(params: CounterProps) {
        super(params);
    }
}

export class Counter2 extends Immutable.Record({
    value:null,
    status:null
}) implements CounterProps {
    value: number;
    status: string;
    constructor(params: CounterProps) {
        super(params);
    }
}


const a = new Counter({value:1, status:"a"});
// console.log(a.value=2)
console.log(a.toJson());

const a2 = new Counter2({value:1, status:"a"});
console.log(a2.set("value",5).toJS());
