import { combineEpics } from "redux-observable";
import { createEpicMiddleware } from "redux-observable";
import { fetchListEpic, fetchListEpic2 } from "./sample3";
import { initEnvironmentEpic } from "./environment";

const epics = combineEpics(
    fetchListEpic,
    fetchListEpic2,
    initEnvironmentEpic
);

export const epicMiddleware = createEpicMiddleware(epics);