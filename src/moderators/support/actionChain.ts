import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";

interface PayloadAction<P> extends Action {
    type: string;
    payload: P;
}

interface ActionCreatorTFSA<P> {
    type: string;
    (payload: P): PayloadAction<P>;
}
interface Effect<PARAMS, STATE> {
    effect?: true
    (params: PARAMS, api: MiddlewareAPI<STATE>): void
};

export type Handler<PARAMS, STATE> =
    Effect<PARAMS, STATE> |
    ((params: PARAMS) => Action);

interface Chain<PARAMS, STATE> {
    type: string,
    handler: Handler<PARAMS, STATE>
}

function isPromise(val: any): val is Promise<any> {
    return val && typeof val.then === 'function';
}

function isType(action: any, type: string) {
    return action && action.type == type;
}

function isEffect<P, S>(val: any): val is Effect<P, S> {
    return val && val.effect;
}

function getType(target: ActionCreatorTFSA<any> | Function | string): string {
    if (typeof target == "string") {
        return target;
    } else if ((<ActionCreatorTFSA<any>>target).type) {
        return (<ActionCreatorTFSA<any>>target).type;
    } else {
        return target.toString();
    }
}


export const combineChains = <STATE>(...chains: ActionChain<STATE>[]): ActionChain<STATE> =>
    new ActionChain<STATE>(...chains);



export const effect = <PARAMS, STATE>(f: Effect<PARAMS, STATE>): Effect<PARAMS, STATE> => {
    f.effect = true;
    return f;
}
export class ActionChain<STATE> {
    private cases: Array<Chain<any, STATE>>

    constructor(...chains: ActionChain<STATE>[]) {
        this.cases = chains
            .map((chain) => chain.cases)
            .reduce((a, b) => a.concat(b), []);
    }

    /**
     * target action paylod is handler function params
     * @param action
     * @param handler
     */
    chain<PARAMS>(
        target: (...ags: any[]) => PayloadAction<PARAMS>,
        handler: Handler<PARAMS, STATE>
    ): ActionChain<STATE>
    chain<undefined>(
        target: (...ags: any[]) => Action,
        handler: Handler<undefined, STATE>
    ): ActionChain<STATE>
    chain<PARAMS>(
        target: string,
        handler: Handler<PARAMS, STATE>
    ): ActionChain<STATE>
    chain<PARAMS>(
        target:  Function | string,
        handler: Handler<PARAMS, STATE>
    ): ActionChain<STATE> {
        this.chain(getType(target), handler);
        return this;
    }

    chainOfType<PARAMS>(
        type: string,
        handler: Handler<PARAMS, STATE>
    ): ActionChain<STATE> {
        this.cases.push({ type, handler });
        return this;
    }

    handle(handler: (chain: Chain<any, STATE>) => void) {
        this.cases.map(handler)
    }
}

const handler = <S>(action: Action, api: MiddlewareAPI<S>) => <PARAMS>(chain: Chain<PARAMS, S>) => {
    if (!isType(action, chain.type)) {
        return;
    }
    const payload: PARAMS = (<PayloadAction<PARAMS>>action).payload;
    if (isEffect(chain.handler)) {
        chain.handler(payload, api);
    } else {
        const next = chain.handler(payload);
        if (!next) return;

        if (isPromise(next)) {
            next.then(api.dispatch);
        } else {
            api.dispatch(next as any);
        }
    }
}

export const createActionChainMiddleware = (chain: ActionChain<any>): Middleware => {
    return <STATE>(api: MiddlewareAPI<STATE>) =>
        (next: Dispatch<STATE>) => <A extends Action>(action: A): A => {
            const result = next(action);
            (<ActionChain<STATE>>chain).handle(handler<STATE>(action, api));
            return result;
        };
}
