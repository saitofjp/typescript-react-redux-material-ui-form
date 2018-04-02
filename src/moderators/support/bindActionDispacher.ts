import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import { isType, ActionCreator, Action, AnyAction} from "typescript-fsa";

interface Handler<PARAMS, ACTION> {
    target: ActionCreator<PARAMS>;
    bind: (params: PARAMS) => ACTION;
}

export class ActionBinder {
    handlers: Handler<any, any>[] = [] //any以外の対処法が分からない。。
    case<PARAMS, ACTION>(
        target: ActionCreator<PARAMS>,
        bind: (params: PARAMS) => ACTION
    ): ActionBinder {
        this.handlers.push({ target, bind })
        return this;
    }
    build() {
        return this.handlers;
    }
}

export const bindActionDispatcherCreater = (builders: ActionBinder[]): Middleware => {
    const handlers = builders
        .map((b) => b.build())
        .reduce((a, b) => a.concat(b), []);

    return <S>(api: MiddlewareAPI<S>) =>
        (next: Dispatch<S>) =>
            <A extends AnyAction >(action: A): A => {
                const result = next(action);
                for (const { target,  bind } of handlers) {
                    if (target.match(action)) {
                        api.dispatch(bind(action.payload));
                    }
                }
                return result;
            };
}
