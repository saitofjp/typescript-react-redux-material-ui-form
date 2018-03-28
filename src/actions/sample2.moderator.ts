import { ThunkAction } from './moderator';
import { loading } from './environment';
import { receiveList, receivePosts } from './sample2';

import { fetchPosts, Posts } from '../adapter/post';
import { isListFetched } from '../selectors/sample2';

export function getPosts2(): ThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        if (isListFetched(getState())) {
            return
        }
        try {
            dispatch(loading(true))
            const json: Posts = await fetchPosts();
            dispatch(receiveList(json));
            dispatch(receivePosts(json));
        } catch (e) {
            dispatch(receiveList(e as Error)) //エラーは自動でERRORに登録される
        } finally {
            dispatch(loading(false))
        }
    };
}