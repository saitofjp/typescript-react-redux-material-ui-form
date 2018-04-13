import { fetchListAsync, fetchList, fetchListP, fetchListAfter } from '../actions/sample3';
import { ActionChain, attach } from 'redux-action-chain';
import { fetchPosts } from '../adapter/post';
import { asyncTemplate } from './support/asyncTemplate';
import { initEnvironment, toggleDrawer } from '../actions/environment';
import { resetPage, receivePosts } from '../actions/sample2';
import { ThunkAction } from './support';
import { State } from '../reducers';
import { Action } from 'typescript-fsa';

// const a = () => ({ type: "1" });
const b = (a:number) => ({ type: "1" , payload:1});

export const sample3Chain = new ActionChain()
    .chain(toggleDrawer, resetPage)
    .chain(initEnvironment.type, fetchList)
    //action chain
    .chain(fetchList, fetchListAfter)
    //action chain2
    .chain(b, fetchListAfter)
    //action chian next param
    .chain(b, (n:number) => fetchListP(1))
    //simple handler
    .chain(fetchList, attach<Action<undefined>, State>((action, {dispatch, getState }) => {
        getState().sample3;
        console.log("handler");
    }))
    //thunk like Action chain
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
    .chain(fetchListP, fetchListP)
    // paramter action
    .chain(fetchListP, attach( ( action:Action<number>, { getState }  ) => {
        action.payload;
    }));
