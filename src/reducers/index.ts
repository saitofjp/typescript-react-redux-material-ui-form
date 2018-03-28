import { combineReducers } from "redux";
import environment, { EnvironmentState } from "./environment";
import sample2, { Sample2State } from "./sample2";
import { reducer as formReducer, FormStateMap } from 'redux-form'

//https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers

export interface State {
  readonly environment: EnvironmentState;
  readonly sample2: Sample2State;
  readonly form: FormStateMap;
}

const rootReducer = combineReducers<State>({
  environment,
  sample2,
  form :formReducer
});

export default rootReducer;
