import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as Sample3Actions from "../actions/sample3";
import * as Sample2Actions from "../actions/sample2";
import * as Environment from "../actions/environment";
import { Sample3 } from "../models/sample3";

export default reducerWithInitialState(new Sample3())
    .case(Sample3Actions.list.started, (state) => state.request())
    .case(Sample3Actions.list.done, (state, { result }) => state.addList(result))
    .case(Sample3Actions.list.failed, (state, { error }) => state.error(error))
    .case(Environment.scrollBottom, state => state.pageInc())
    .case(Sample2Actions.resetPage, state => state.pageReset());
