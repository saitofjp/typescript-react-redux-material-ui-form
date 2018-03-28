import { State } from "../reducers";

//CQRSのQuery

export const isListFetched = ({ sample2: { list, page } }: State) =>
  list.length !== 0;

export const listOfPosts = ({ sample2: { list, page } }: State) => {
  const limit = page * 10;
  return list.slice(0, limit > list.length ? list.length - 1 : limit);
};
