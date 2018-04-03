
import 'rxjs';
import 'typescript-fsa-redux-observable'; // <-- here
import { Epic } from 'redux-observable';
import { State } from '../reducers';
import { fetchList, fetchListAsync } from '../actions/sample3';

import { fetchPosts } from '../adapter/post';


import { of as of$ } from 'rxjs/observable/of'
import { concat as concat$ } from 'rxjs/observable/concat'
import { fromPromise as fromPromise$ } from 'rxjs/observable/fromPromise';
import { loading } from '../actions/environment';
import { AsyncActionCreators } from 'typescript-fsa';

const asyncTemplateRx = <PARAMS, RESULT>(
    asyncAction: AsyncActionCreators<PARAMS, RESULT, Error>,
    inner: (p: PARAMS) => Promise<RESULT>
) =>
    (paramsArg?: PARAMS) => {
        const params = paramsArg ? paramsArg : {} as PARAMS;
        return concat$(
            of$(loading(true)),
            of$(asyncAction.started(params)),
            fromPromise$(inner(params))
                .map(res => asyncAction.done({ params, result: res }))
                .catch(e => of$(asyncAction.failed(e))),
            of$(loading(false)),
        )
    }


export const fetchListEpic: Epic<any, State> =
    (action$, { getState }) => action$.ofAction(fetchList)
        .filter( ()=> ! getState().sample3.isFetched )
        .map(({ payload }) => payload)
        .map(asyncTemplateRx(fetchListAsync, fetchPosts));

