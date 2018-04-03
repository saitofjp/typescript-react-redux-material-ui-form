import { combineEpics } from "redux-observable";
import { createEpicMiddleware } from "redux-observable";
import { fetchListEpic } from "./sample3";
import { initEnvironmentEpic } from "./environment";

const epics = combineEpics(
    fetchListEpic,
    initEnvironmentEpic
);

export const epicMiddleware = createEpicMiddleware(epics);