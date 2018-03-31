
import actionCreatorFactory from 'typescript-fsa';

import { Posts } from '../adapter/post';

const actionCreator = actionCreatorFactory("Sample3");

export const fetchList = actionCreator.async<void, Posts>("FETCH_LIST");