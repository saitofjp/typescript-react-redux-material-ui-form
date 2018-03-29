 import * as Immutable from "immutable";
import { Sample3 } from "./sample3";

//immutable使うか思案中
// typescriptの場合いらない可能性が結構高い

interface CounterProps {
    value?: number;
    status: string;
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


const a = new Sample3();
// console.log(a.value=2)
console.log(a.toJS());
console.log(Object.assign({},a))
console.log(a);

const b = new Sample3().merge(a);
console.log(a == b)

const c = b.merge({page:2});
console.log(c);

const a2 = new Counter2({value:1, status:"a"});
console.log(a2.set("value",5).toJS());
const b2 = a2.merge({value:2})
console.log(b2.toJS())