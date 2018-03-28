import { State } from "../reducers";

export const isDrawerOpen = ({ environment: { drawerOpen } }: State) =>drawerOpen;
export const isLoading = ({ environment: { loading } }: State) => loading;
