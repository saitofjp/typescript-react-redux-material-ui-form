import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as Sample2Actions from "../actions/sample2";
import * as Environment from "../actions/environment";
import { Sample3 } from "../models/sample3";

export default reducerWithInitialState(new Sample3())
    .case(Sample2Actions.requestList, (state, payload) => state.request())
    .case(Sample2Actions.receiveList, (state, payload) => {
        return payload instanceof Error
            ? state.error(payload)
            : state.addList(payload);
    })
    .case(Environment.scrollBottom, state => state.pageInc())
    .case(Sample2Actions.resetPage, state => state.pageReset());
