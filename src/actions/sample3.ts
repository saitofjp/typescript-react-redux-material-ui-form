
import actionCreatorFactory from 'typescript-fsa';

import { Posts } from '../adapter/post';

const actionCreator = actionCreatorFactory("Sample3");

export const list = actionCreator.async<undefined, Posts>("LIST");