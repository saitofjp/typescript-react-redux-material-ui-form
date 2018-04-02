import { combineEpics } from "redux-observable";
import { createEpicMiddleware } from "redux-observable";
import { fetchListAfterEpic, fetchListEpic } from "./sample3";
import { initEnvironmentEpic } from "./environment";

const epics = combineEpics(
    fetchListAfterEpic,
    fetchListEpic,
    initEnvironmentEpic
);

export const epicMiddleware = createEpicMiddleware(epics);