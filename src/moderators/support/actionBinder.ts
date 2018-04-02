import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import { ActionCreator as FsaActionCreator, AnyAction } from "typescript-fsa";

export type ActionCreatorOrHandler<PARAMS, ACTION> = (params?: PARAMS) => (ACTION | void);

interface Binder<PARAMS, ACTION> {
    target: FsaActionCreator<PARAMS>;
    bind: ActionCreatorOrHandler<PARAMS, ACTION>;
}

export class ActionBinder {
    binders: Binder<any, any>[] = [] //any以外の対処法が分からない。。

    /**
     * target action paylod is bind function params
     * @param target
     * @param bind
     */
    case<PARAMS, ACTION>(
        target: FsaActionCreator<PARAMS>,
        bind: ActionCreatorOrHandler<PARAMS, ACTION>
    ): ActionBinder {
        this.binders.push({ target, bind })
        return this;
    }

    build() {
        return this.binders;
    }
}

export const actionBinderDispatcherCreater = (builders: ActionBinder[]): Middleware => {
    const binders = builders
        .map((builder) => builder.build())
        .reduce((a, b) => a.concat(b), []);

    return <S>(api: MiddlewareAPI<S>) =>
        (next: Dispatch<S>) => <A extends AnyAction>(action: A): A => {
            const result = next(action);

            for (const { target, bind } of binders) {
                if (!target.match(action)) continue;

                const nextAction = bind(action.payload);
                if (nextAction) api.dispatch(nextAction);
            }

            return result;
        };
}
