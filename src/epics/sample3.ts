
import 'rxjs';
import 'typescript-fsa-redux-observable'; // <-- here
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { State } from '../reducers';
import { fetchList, fetchListAfter, fetchListAsync } from '../actions/sample3';

import { fetchPosts } from '../adapter/post';
import { asyncTemplate } from '../moderators/support/asyncTemplate';


export const fetchListAfterEpic: Epic<Action, State> =
    (action$, { getState }) => action$.ofAction(fetchList)
        .map(action => fetchListAfter())

export const fetchListEpic: Epic<any, State> =
    (action$, store) => action$.ofAction(fetchList)
        .map(({ payload }) => payload)
        //TODO Observable化
        .map(asyncTemplate(fetchListAsync, () => async (dispatch, getState) => {
            const { sample3 } = getState();
            if (sample3.isFetched) return;
            return fetchPosts();
        }));
