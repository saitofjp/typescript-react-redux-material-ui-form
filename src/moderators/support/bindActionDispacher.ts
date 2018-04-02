import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import { ActionCreator, AnyAction} from "typescript-fsa";

interface Binder<PARAMS, ACTION> {
    target: ActionCreator<PARAMS>;
    bind: (params: PARAMS) => ACTION;
}

export class ActionBinder {
    binders: Binder<any, any>[] = [] //any以外の対処法が分からない。。
    case<PARAMS, ACTION>(
        target: ActionCreator<PARAMS>,
        bind: (params: PARAMS) => ACTION
    ): ActionBinder {
        this.binders.push({ target, bind })
        return this;
    }
    build() {
        return this.binders;
    }
}

export const bindActionDispatcherCreater = (builders: ActionBinder[]): Middleware => {
    const binders = builders
        .map((b) => b.build())
        .reduce((a, b) => a.concat(b), []);

    return <S>(api: MiddlewareAPI<S>) =>
        (next: Dispatch<S>) =>
            <A extends AnyAction >(action: A): A => {
                const result = next(action);
                for (const { target,  bind } of binders) {
                    if (target.match(action)) {
                        api.dispatch(bind(action.payload));
                    }
                }
                return result;
            };
}
