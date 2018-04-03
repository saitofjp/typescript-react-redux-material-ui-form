import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";

interface PayloadAction<P> extends Action {
    type: string;
    payload: P;
}
interface ActionCreatorTFSA<P> {
    type: string;
    match: (action: Action) => action is PayloadAction<P>;
    (payload: P): PayloadAction<P>;
}

export type ActionCreatorOrHandler<PARAMS, ACTION> = (params?: PARAMS) => (ACTION | void);

class ChainFsa<PARAMS, ACTION> {
    constructor(
        private target: ActionCreatorTFSA<PARAMS>,
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

export const combineChains = (...chains: ActionChain[]): ActionChain => new ActionChain(...chains);

export class ActionChain {
    private cases: Array<ChainFsa<any, any> | ChainType<any, any>>

    constructor(...chains: ActionChain[]) {
        this.cases = chains
            .map((chain) => chain.cases)
            .reduce((a, b) => a.concat(b), []);
    }

    /**
     * target action paylod is handler function params
     * @param action
     * @param handler
     */
    chain<PARAMS, ACTION>(
        target: ActionCreatorTFSA<PARAMS> | string,
        handler: ActionCreatorOrHandler<PARAMS, ACTION>
    ): ActionChain {
        if (typeof target == "string") {
            this.chainOfType(target, handler);
        } else if (target.match) {
            this.chainOfAction(target, handler);
        } else {
            this.chainOfType(target.toString(), handler);
        }
        return this;
    }

    chainOfAction<PARAMS, ACTION>(
        action: ActionCreatorTFSA<PARAMS>,
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

    handle(action: Action) {
        return this.cases
            .map((chain) => chain.handle(action))
            .filter((nextAction) => nextAction);
    }
}

export const createActionChainMiddleware = (chain: ActionChain): Middleware => {
    return <S>(api: MiddlewareAPI<S>) =>
        (next: Dispatch<S>) => <A extends Action>(currentAction: A): A => {
            const result = next(currentAction);

            chain
                .handle(currentAction)
                .map(api.dispatch)

            return result;
        };
}
