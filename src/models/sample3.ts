import Base from ".";
import { Posts } from "../adapter/post";

// reducer/sample2とreducer/sample3の差を見てみると非常にわかりやすい

/**
 * readonlyで実質immutableが実現できている
 */
export class Sample3 extends Base<Sample3> {
    readonly fetch: boolean;
    readonly list: Posts; //ここもapiままにすると依存が、、
    readonly page: number;
    readonly errorMessage?: String;

    constructor() {
        super();
        this.fetch = true;
        this.list = [];
        this.page = 1;
    }

    get isFetched(): boolean {
        return this.list.length != 0;
    }
    get listByPage(): Posts {
        return this.list.slice(0, this.limit);
    }
    get limit(): number{
        return this.page * 10;
    }

    addList(posts: Posts) {
        return this.merge({
             list:posts,
             fetch: false
         });
     }
     error(error: Error) {
        return this.merge({
            list: [],
            errorMessage: error.message,
            fetch: false
        });
    }
    request() {
        return this.merge({
            fetch: true
        });
    }
    pageReset() {
        return this.merge({
            page: 1
        });
    }
    pageInc() {
        const limitOver = this.limit > this.list.length ;
        if(limitOver) {
            return this;
        }
        return this.merge({
            page: this.page+1
        });
    }

}