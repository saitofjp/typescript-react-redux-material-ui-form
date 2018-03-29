import { createSelector } from 'reselect';
import { State } from "../reducers";

export const smaple3Selector = (state:State) => state.sample3;
//CQRSのQuery
export const isListFetched = createSelector(smaple3Selector, (sample3) => sample3.isFetched);
export const listOfPosts = createSelector(smaple3Selector, (sample3) => sample3.listByPage);
