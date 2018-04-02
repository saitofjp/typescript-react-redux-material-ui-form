import { fetchListAsync, fetchList, fetchListP, fetchListAfter } from '../actions/sample3';

import { fetchPosts } from '../adapter/post';
import { ActionChain } from './support/actionChain';
import { asyncTemplate } from './support/asyncTemplate';


export const sample3Binder = new ActionChain()
    .case(fetchList, asyncTemplate(fetchListAsync, () => async (dispatch, getState) => {
        const { sample3 } = getState();
        if (sample3.isFetched) return;
        return fetchPosts();
    }))
    .case(fetchList, () => fetchListAfter())
    .case(fetchList, () => {
        console.log("handler");
        return;
    })
    .case(fetchListP, (param: number) => {
        console.log("handler with param", param);
        return;
    });
