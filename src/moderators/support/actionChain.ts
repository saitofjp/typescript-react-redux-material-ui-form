import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";

interface PayloadAction<P> extends Action {
    type: string;
    payload: P;
}
interface ActionCreatorFsa<P> {
    type: string;
    match: (action: Action) => action is PayloadAction<P>;
    (payload: P): PayloadAction<P>;
}

export type ActionCreatorOrHandler<PARAMS, ACTION> = (params?: PARAMS) => (ACTION | void);

class ChainFsa<PARAMS, ACTION> {
    constructor(
        private target: ActionCreatorFsa<PARAMS>,
        private handler: ActionCreatorOrHandler<PARAMS, ACTION>
    ) { }

    handle(action: Action) {
        if (this.target.match(action)) {
            return this.handler(action.payload);
        }
    }
}

class ChainType<PARAMS, ACTION> {
    constructor(
        private type: string,
        private handler: ActionCreatorOrHandler<PARAMS, ACTION>
    ) { }

    handle(action: Action) {
        if (action.type && this.type == action.type) {
            return this.handler((<any>action).payload);
        }
    }
}

export class ActionChain {
    private cases: Array<ChainFsa<any, any> | ChainType<any, any>> = [] //any以外の対処法が分からない。。

    /**
     * target action paylod is handler function params
     * @param action
     * @param handler
     */
    chain<PARAMS, ACTION>(
        target: ActionCreatorFsa<PARAMS> | string ,
        handler: ActionCreatorOrHandler<PARAMS, ACTION>
    ): ActionChain {
        if (typeof target == "string") {
            this.chainOfType(target, handler);
        } else if (target.match) {
            this.chainOfAction(target, handler);
        } else if (target.type) {
            this.chainOfType(target.type, handler);
        }
        return this;
    }

    chainOfAction<PARAMS, ACTION>(
        action: ActionCreatorFsa<PARAMS>,
        handler: ActionCreatorOrHandler<PARAMS, ACTION>
    ): ActionChain {
        this.cases.push(new ChainFsa(action, handler));
        return this;
    }

    chainOfType<PARAMS, ACTION>(
        type: string,
        handler: ActionCreatorOrHandler<PARAMS, ACTION>
    ): ActionChain {
        this.cases.push(new ChainType(type, handler));
        return this;
    }

    build() {
        return this.cases;
    }
}

export const createActionChainMiddleware = (...chains: ActionChain[]): Middleware => {
    const cases = chains
        .map((chain) => chain.build())
        .reduce((a, b) => a.concat(b), []);

    return <S>(api: MiddlewareAPI<S>) =>
        (next: Dispatch<S>) => <A extends Action>(currentAction: A): A => {
            const result = next(currentAction);

            cases
                .map((chain) => chain.handle(currentAction))
                .filter((nextAction) => nextAction)
                .map(api.dispatch)

            return result;
        };
}
