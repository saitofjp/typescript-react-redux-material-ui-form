import { fetchListAsync, fetchList, fetchListP, fetchListAfter } from '../actions/sample3';

import { fetchPosts } from '../adapter/post';
import { ActionChain } from './support/actionChain';
import { asyncTemplate } from './support/asyncTemplate';
import { initEnvironment, toggleDrawer } from '../actions/environment';
import { resetPage, receivePosts } from '../actions/sample2';
import { ThunkAction } from './support';


export const sample3Chain = new ActionChain()
    .chain(toggleDrawer, resetPage)
    .chain(initEnvironment.type, fetchList)
    //action chain
    .chain(fetchList, fetchListAfter)
    //action chian next param
    .chain(fetchList, ()=> fetchListP(1) )
    //simple handler
    .chain(fetchList, () => {
        console.log("handler");
    })
    //thunkAction chain
    .chain(fetchList, (): ThunkAction<Promise<void>> => async (dispatch, getState) => {
        const { sample3 } = getState();
        if (sample3.isFetched) return;
        const res = await fetchPosts();
        dispatch(receivePosts(res));
    })
    //asyncTemplate
    .chain(fetchList, asyncTemplate(fetchListAsync, () => async (dispatch, getState) => {
        const { sample3 } = getState();
        if (sample3.isFetched) return;
        return fetchPosts();
    }))
    // paramter action
    .chain(fetchListP, (param: number) => {
        console.log("handler with param", param);
        return;
    });
