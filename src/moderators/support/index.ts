import { ThunkAction } from "redux-thunk";
import { State } from "../../reducers";

export type ThunkAction<R> = ThunkAction<R, State, void>;
