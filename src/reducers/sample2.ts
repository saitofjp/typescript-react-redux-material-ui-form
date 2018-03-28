import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as Sample2Actions from "../actions/sample2";
import * as Environment from "../actions/environment";
import { Posts } from "../adapter/post";

export interface Sample2State {
  fetch: boolean;
  list: Posts;
  page: number;
  errorMessage?: String;
}

const initialState: Sample2State = {
  list: [],
  page: 1,
  fetch: false
};

export default reducerWithInitialState(initialState)
  .case(Sample2Actions.requestList, (state, payload) => ({
    ...state,
    fetch: true
  }))
  .case(Sample2Actions.receiveList, (state, payload) =>
      payload instanceof Error
        ? {
            ...state,
            list: [],
            errorMessage: payload.message,
            fetch: false
          }
        : {
            ...state,
            list: payload,
            fetch: false
          }
  )
  .case(Environment.scrollBottom, state => ({
    ...state,
    page: state.page + 1
  }))
  .case(Sample2Actions.resetPage, state => ({
    ...state,
    page: initialState.page
  }));
