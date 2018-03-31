import { bindModeratorAction } from './moderator';
import { fetchListAsync  } from './sample3';

import { fetchPosts } from '../adapter/post';

export const fetchList = bindModeratorAction(fetchListAsync, async ({getState})=> {
    const {sample3} = getState();
    if(sample3.isFetched) return;
    return fetchPosts();
});