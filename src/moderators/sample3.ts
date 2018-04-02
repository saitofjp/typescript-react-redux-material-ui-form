import { fetchListAsync, fetchList, fetchListP, fetchListAfter } from '../actions/sample3';

import { fetchPosts } from '../adapter/post';
import { ActionBinder } from './support/actionBinder';
import { asyncActionTemplate } from './support';


export const sample3Binder = new ActionBinder()
    .case(fetchList, asyncActionTemplate(fetchListAsync, () => async (dispatch, getState) => {
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
