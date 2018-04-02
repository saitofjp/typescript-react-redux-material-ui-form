import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";
import { ActionCreator as FsaActionCreator } from "typescript-fsa";

export type ActionCreatorOrHandler<PARAMS, ACTION> = (params?: PARAMS) => (ACTION | void);

interface ChainCase<PARAMS, ACTION> {
    action: FsaActionCreator<PARAMS>;
    handler: ActionCreatorOrHandler<PARAMS, ACTION>;
}

export class ActionChain {
    cases: ChainCase<any, any>[] = [] //any以外の対処法が分からない。。

    /**
     * target action paylod is handler function params
     * @param action
     * @param handler
     */
    chain<PARAMS, ACTION>(
        action: FsaActionCreator<PARAMS>,
        handler: ActionCreatorOrHandler<PARAMS, ACTION>
    ): ActionChain {
        this.cases.push({ action, handler })
        return this;
    }

    build() {
        return this.cases;
    }
}

export const actionChainCreater = (chains: ActionChain[]): Middleware => {
    const cases = chains
        .map((chain) => chain.build())
        .reduce((a, b) => a.concat(b), []);

    return <S>(api: MiddlewareAPI<S>) =>
        (next: Dispatch<S>) => <A extends Action>(currentAction: A): A => {
            const result = next(currentAction);

            for (const { action, handler } of cases) {
                if (!action.match(currentAction)) continue;

                const nextAction = handler(currentAction.payload);
                if (nextAction) api.dispatch(nextAction);
            }

            return result;
        };
}
