import { fetchListAsync, fetchList, fetchListP, fetchListAfter } from '../actions/sample3';

import { fetchPosts } from '../adapter/post';
import { ActionChain } from './support/actionChain';
import { asyncTemplate } from './support/asyncTemplate';


export const sample3Binder = new ActionChain()
    .chain(fetchList, () => fetchListAfter())
    .chain(fetchList, () => {
        console.log("handler");
        return;
    })
    .chain(fetchList, asyncTemplate(fetchListAsync, () => async (dispatch, getState) => {
        const { sample3 } = getState();
        if (sample3.isFetched) return;
        return fetchPosts();
    }))
    .chain(fetchListP, (param: number) => {
        console.log("handler with param", param);
        return;
    });
