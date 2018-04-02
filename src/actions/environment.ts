import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory("Environment");

export const loading = actionCreator<boolean>("LOADING");
export const toggleDrawer = actionCreator<boolean>("DRAWER");
export const scrollBottom = actionCreator("SCROOLL_BOTTOM");
export const initEnvironment = actionCreator("INIT");