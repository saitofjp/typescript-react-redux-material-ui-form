import { createSelector } from 'reselect';
import { State } from "../reducers";

//CQRSのQuery
const smaple3Selector = (state:State) => state.sample3;

export const isListFetched = createSelector(smaple3Selector, (sample3) => sample3.isFetched);
export const listOfPosts = createSelector(smaple3Selector, (sample3) => sample3.listByPage);
