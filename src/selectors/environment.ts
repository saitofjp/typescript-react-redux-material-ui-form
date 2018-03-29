import { createSelector } from 'reselect';
import { State } from "../reducers";

const environmentSelector = (state:State) => state.environment;

export const isDrawerOpen = createSelector(environmentSelector, (environment)=> environment.drawerOpen)
export const isLoading = createSelector(environmentSelector, (environment)=> environment.loading)