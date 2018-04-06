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
export type Handler<PARAMS, ACTION, STATE> = ActionCreatorHandler<PARAMS, ACTION>
    | { effect: EffectHandler<PARAMS, STATE> };

export const effect = <PARAMS, STATE>(effect: EffectHandler<PARAMS, STATE>)
    : { effect: EffectHandler<PARAMS, STATE> } => {
    return { effect }
}

export interface Chain<PARAMS, ACTION, STATE> {
    type: string,
    handler: Handler<PARAMS, ACTION, STATE>
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

export const combineChains = <STATE>(...chains: ActionChain<STATE>[]): ActionChain<STATE> =>
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
     * @param action
     * @param handler
     */
    chain<PARAMS, ACTION>(
        target: ActionCreator<PayloadAction<PARAMS>> | string,
        handler: Handler<PARAMS, ACTION, STATE>
    ): ActionChain<STATE> {
        this.chainOfType(getType(target), handler);
        return this;
    }

    private chainOfType<PARAMS, ACTION>(
        type: string,
        handler: Handler<PARAMS, ACTION, STATE>
    ): ActionChain<STATE> {
        this.cases.push({ type, handler });
        return this;
    }

    handle(handler: (chain: Chain<any, any, STATE>) => void) {
        this.cases.map(handler)
    }
}

const handler = <S>(action: Action, api: MiddlewareAPI<S>) => <PARAMS>(chain: Chain<PARAMS, any, S>) => {
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
            (<ActionChain<STATE>>chain).handle(handler(action, api));
            return result;
        };
}
