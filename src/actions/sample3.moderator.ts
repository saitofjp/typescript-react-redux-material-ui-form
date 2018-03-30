import { bindModeratorAction } from './moderator';
import { list } from './sample3';

import { fetchPosts } from '../adapter/post';

export const fetchList = bindModeratorAction(list, async ({getState})=> {
    const {sample3} = getState();
    if(sample3.isFetched) return;
    return fetchPosts();
});
