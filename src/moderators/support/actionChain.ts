import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";
import { ActionCreator as ActionCreatorFsa } from "typescript-fsa";

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


export class ActionChain {
    private cases: Array<ChainFsa<any, any>> = [] //any以外の対処法が分からない。。

    /**
     * target action paylod is handler function params
     * @param target
     * @param handler
     */
    chain<PARAMS, ACTION>(
        target: ActionCreatorFsa<PARAMS>,
        handler: ActionCreatorOrHandler<PARAMS, ACTION>
    ): ActionChain {
        this.cases.push(new ChainFsa(target, handler));
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
