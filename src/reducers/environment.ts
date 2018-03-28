import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as Environment from "../actions/environment";

export interface EnvironmentState {
  loading: boolean;
  drawerOpen: boolean;
}

const initialState: EnvironmentState = {
  loading: false,
  drawerOpen: false
};

export default reducerWithInitialState(initialState)
  .case(Environment.loading, (state, payload) => ({
    ...state,
    loading: payload
  }))
  .case(Environment.toggleDrawer, (state, payload) => ({
    ...state,
    drawerOpen: payload
  }));
