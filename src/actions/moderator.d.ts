import { ThunkAction } from "redux-thunk";
import { State } from "../reducers";

//アクションがStateを知るべきじゃないが型安全のため隠匿
export type ThunkAction<R> = ThunkAction<R, State, void>;
