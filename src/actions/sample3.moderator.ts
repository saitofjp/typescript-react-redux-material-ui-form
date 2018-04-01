import { bindModeratorAction } from './moderator';
import { fetchListAsync  } from './sample3';

import { fetchPosts } from '../adapter/post';
import { create } from '../adapter/electron';


export const fetchList = bindModeratorAction(fetchListAsync, async ({getState})=> {
    const {sample3} = getState();
    if(sample3.isFetched) return;
    create().openNewwindow();
    return fetchPosts();
});