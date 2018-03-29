import { createSelector } from 'reselect';
import { State } from "../reducers";

//　sample3と比べてみよう

//CQRSのQuery
const smaple2Selector = (state:State) => state.sample2;

export const isListFetched = createSelector(smaple2Selector, ({ list, page }) =>
  list.length !== 0);

export const listOfPosts = createSelector(smaple2Selector, ({ list, page } ) => {
  const limit = page * 10;
  return list.slice(0, limit > list.length ? list.length - 1 : limit);
})
