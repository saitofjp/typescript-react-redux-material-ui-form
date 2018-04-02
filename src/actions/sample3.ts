
import actionCreatorFactory from 'typescript-fsa';

import { Posts } from '../adapter/post';

const actionCreator = actionCreatorFactory("Sample3");

export const fetchList = actionCreator("FETCH_LIST");
export const fetchListAsync = actionCreator.async<void, Posts>("FETCH_LIST");

export const fetchListP = actionCreator<number>("FETCH_LIST_P");
export const fetchListAsyncP = actionCreator.async<number, Posts>("FETCH_LIST_P");