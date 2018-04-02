import { fetchListAsync, fetchList, fetchListP } from '../actions/sample3';

import { fetchPosts } from '../adapter/post';
import { ActionBinder } from './support/bindActionDispacher';
import { asyncActionTemplate } from './support';


export const sample3Binder = new ActionBinder()
    .case(fetchList, asyncActionTemplate(fetchListAsync, () => async (dispatch, getState) => {
        const { sample3 } = getState();
        if (sample3.isFetched) return;
        return fetchPosts();
    }))
    .case(fetchList, () => () => {
        console.log("bind2");
        return;
    }).case(fetchListP, (param: number) => () => {
        console.log("param", param);
        return;
    });
