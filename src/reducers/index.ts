import { combineReducers } from "redux";
import environment, { EnvironmentState } from "./environment";
import sample2, { Sample2State } from "./sample2";
import { reducer as formReducer, FormStateMap } from 'redux-form'
import sample3 from "./sample3";
import { Sample3 } from "../models/sample3";

//https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers

export interface State {
  readonly environment: EnvironmentState;
  readonly sample2: Sample2State;
  readonly sample3: Sample3;
  readonly form: FormStateMap;
}

const rootReducer = combineReducers<State>({
  environment,
  sample2,
  sample3,
  form :formReducer
});

export default rootReducer;
