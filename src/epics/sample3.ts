
import 'rxjs';
import 'typescript-fsa-redux-observable'; // <-- here
import { Epic } from 'redux-observable';
import { State } from '../reducers';
import { fetchListAsync } from '../actions/sample3';

import { fetchPosts } from '../adapter/post';


import { of as of$ } from 'rxjs/observable/of'
import { concat as concat$ } from 'rxjs/observable/concat'
import { loading, initEnvironment } from '../actions/environment';
import { AsyncActionCreators } from 'typescript-fsa';
// import { Dispatch } from 'redux';

const asyncTemplateRx = <PARAMS, RESULT>(
    asyncAction: AsyncActionCreators<PARAMS, RESULT, Error>,
    inner: (p: PARAMS) => Promise<RESULT>
) =>
    (paramsArg?: PARAMS) => {
        const params = paramsArg ? paramsArg : {} as PARAMS;
        return concat$(
            of$(loading(true)),
            of$(asyncAction.started(params)),
            of$(params).mergeMap(inner)
                .map(res => asyncAction.done({ params, result: res }))
                .catch(e => of$(asyncAction.failed({ params, error: e }))),
            of$(loading(false)),
        )
    }
// const asyncTemplateRx2 = <PARAMS, RESULT, STATE>(
//     asyncAction: AsyncActionCreators<PARAMS, RESULT, Error>,
//     dispatch: Dispatch<STATE>,
//     inner: (p: PARAMS) => Promise<RESULT>
// ) =>
//     async (paramsArg: PARAMS) => {
//         const params = paramsArg ? paramsArg : {} as PARAMS;
//         try {
//             if (loading) dispatch(loading(true))
//             dispatch(asyncAction.started(params));
//             const res = await inner(params);
//             if (!res) return; //startのまま終わる
//             dispatch(asyncAction.done({
//                 params,
//                 result: res
//             }));
//         } catch (error) {
//             dispatch(asyncAction.failed({ params, error }));
//         } finally {
//             if (loading) dispatch(loading(false))
//         }
//     }


export const fetchListEpic: Epic<any, State> =
    (action$, { getState, dispatch }) => action$.ofAction(initEnvironment)
        .filter(() => !getState().sample3.isFetched)
        .map(({ payload }) => payload)
        .mergeMap(asyncTemplateRx(fetchListAsync, fetchPosts));
