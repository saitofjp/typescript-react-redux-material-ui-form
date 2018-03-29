import { createSelector } from 'reselect';
import { State } from "../reducers";

//モデルの場合、再計算コスト削減のreselect必須

export const smaple3Selector = (state:State) => state.sample3;
//CQRSのQuery
export const isListFetched = createSelector(smaple3Selector, (sample3) => sample3.isFetched);
export const listOfPosts = createSelector(smaple3Selector, (sample3) => sample3.listByPage);
