import { ThunkAction } from "redux-thunk";
import { State } from "../../reducers";
import { AsyncActionCreators } from "typescript-fsa";
import { Dispatch } from "react-redux";
import { loading as loadingAction } from "../../actions/environment";
import { Action } from "redux";

export type ThunkAction<R> = ThunkAction<R, State, void>;

export const asyncActionTemplate = <PARAMS, RESULT>(
    asyncAction: AsyncActionCreators<PARAMS, RESULT, Error>,
    inner: (p: PARAMS) => ThunkAction<Promise<RESULT | undefined>, State, any>,
    loading: ((now: boolean) => Action) | false = (now) => loadingAction(now)
) => {
    return (paramsArg?: PARAMS): ThunkAction<Promise<void>, State, any> => {
        const params = paramsArg ? paramsArg : {} as PARAMS;
        return async (dispatch: Dispatch<State>, getState: () => State) => {
            try {
                if (loading) dispatch(loading(true))
                dispatch(asyncAction.started(params));
                const res = await dispatch(inner(params));
                if (!res) return; //startのまま終わる
                dispatch(asyncAction.done({
                    params,
                    result: res
                }));
            } catch (error) {
                dispatch(asyncAction.failed({ params, error }));
            } finally {
                if (loading) dispatch(loading(false))
            }
        };
    }
}

