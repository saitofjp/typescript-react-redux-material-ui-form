import { Middleware, MiddlewareAPI, Dispatch, Action, ActionCreator } from "redux";

declare module "redux" {
    export interface ActionCreator<A> {
        type?: string;  //etc typescript-fsa ActionCreator
        (...args: any[]): A;
    }
}

export interface PayloadAction<P> extends Action {
    type: string;
    payload: P;
}

export interface EffectHandler<PARAMS, STATE> {
    (params: PARAMS, api: MiddlewareAPI<STATE>): void
}
export interface ActionCreatorHandler<PARAMS, ACTION> {
    (params: PARAMS): ACTION
}
export type Handler<PARAMS, NEXT, STATE> =
    ActionCreatorHandler<PARAMS, NEXT>
    | { effect: EffectHandler<PARAMS, STATE> };

export const effect = <PARAMS, STATE>(effect: EffectHandler<PARAMS, STATE>)
    : { effect: EffectHandler<PARAMS, STATE> } => {
    return { effect }
}

export interface Chain<PARAMS, RETURN, STATE> {
    type: string,
    handler: Handler<PARAMS, RETURN, STATE>
}

function isPromise(val: any): val is Promise<any> {
    return val && typeof val.then === 'function';
}

function isType(action: any, type: string) {
    return action && action.type == type;
}

function isEffect<P, S>(val: any): val is { effect: EffectHandler<P, S> } {
    return val && val.effect;
}

function getType(target: ActionCreator<any> | string): string {
    if (typeof target == "string") {
        return target;
    } else if (target.type) {
        return target.type;
    } else {
        return target.toString();
    }
}

export const combineActionChains = <STATE>(...chains: ActionChain<STATE>[]): ActionChain<STATE> =>
    new ActionChain<STATE>(...chains);


export class ActionChain<STATE> {
    private cases: Array<Chain<any, any, STATE>>

    constructor(...chains: ActionChain<STATE>[]) {
        this.cases = chains
            .map((chain) => chain.cases)
            .reduce((a, b) => a.concat(b), []);
    }

    /**
     * target action payload is handler function params
     * @param target target actionCreator or type
     * @param handler
     * @template NEXT Next action returned by handler
     */
    chain<PARAMS, NEXT>(
        target: ActionCreator<PayloadAction<PARAMS>> | string,
        handler: Handler<PARAMS, NEXT, STATE>
    ): ActionChain<STATE> {
        this.chainOfType(getType(target), handler);
        return this;
    }

     chainOfType<PARAMS, NEXT>(
        type: string,
        handler: Handler<PARAMS, NEXT, STATE>
    ): ActionChain<STATE> {
        this.cases.push({ type, handler });
        return this;
    }

    handlers() {
        return this.cases.map(handler)
    }
}

const handler = <PARAMS, S>(chain: Chain<PARAMS, any, S>) => (action: Action, api: MiddlewareAPI<S>) => {
    if (!isType(action, chain.type)) {
        return;
    }
    const payload: PARAMS = (<PayloadAction<PARAMS>>action).payload;
    if (isEffect(chain.handler)) {
        chain.handler.effect(payload, api);
    } else {
        const next = chain.handler(payload);
        if (!next) throw new Error("return value must be Action or Promise<Action>. Or, use 'effect()'");
        if (isPromise(next)) {
           return next.then(api.dispatch);
        } else {
           return api.dispatch(next as any);
        }
    }
}

export const createActionChainMiddleware = (chain: ActionChain<any>): Middleware => {
    return <STATE>(api: MiddlewareAPI<STATE>) => {
        const handles = (<ActionChain<STATE>>chain).handlers();
        return (next: Dispatch<STATE>) => <A extends Action>(action: A): A => {
            const result = next(action);
            handles.map((handle) => handle(action, api));
            return result;
        };
    }
}
