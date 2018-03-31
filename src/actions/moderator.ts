import { ThunkAction } from "redux-thunk";
import { State } from "../reducers";
import { AsyncActionCreators } from "typescript-fsa";
import { Dispatch } from "react-redux";
import { loading } from "./environment";

export type ThunkAction<R> = ThunkAction<R, State, void>;

export const bindModeratorAction = <PARAMS, RESULT>(
    asyncAction: AsyncActionCreators<PARAMS, RESULT, Error>,
    moderator: (context: {
        params: PARAMS,
        dispatch: Dispatch<State>,
        getState: () => State
    }) => Promise<RESULT | void>,
    opt: {
        start?: () => ThunkAction<void, State, void>,
        end?: () => ThunkAction<void, State, void>,
    } = {
            start: () => (dispatch)=> dispatch(loading(true)),
            end: () => (dispatch) => dispatch(loading(false))
        }
) => {
    return (paramsArg?: PARAMS) => {
        const params = paramsArg ? paramsArg : {} as PARAMS;
        return async (dispatch: Dispatch<State>, getState: () => State) => {
            try {
                if (opt.start) dispatch(opt.start())
                dispatch(asyncAction.started(params));
                const res = await moderator({
                    params,
                    dispatch,
                    getState
                });
                if (!res) return; //startのまま終わる
                dispatch(asyncAction.done({
                    params,
                    result: res
                }));
            } catch (error) {
                dispatch(asyncAction.failed({ params, error }));
            } finally {
                if (opt.end) dispatch(opt.end())
            }
        };
    }
}