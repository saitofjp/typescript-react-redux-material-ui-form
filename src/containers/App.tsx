import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { State } from "../reducers";
import { toggleDrawer } from "../actions/environment";
import { initEnvironment } from "../actions/environment.moderator";
import { resetPage } from "../actions/sample2";
import { getPosts2 } from "../actions/sample2.moderator";

import { isDrawerOpen } from "../selectors/environment";

import App, { AppProps } from "../components/App";


//TODO ファイル名
export default connect(
  (state: State) => ({
    drawerOpen: isDrawerOpen(state)
  }),
  (dispatch: Dispatch<State>) => ({
    onInit: () => {
      dispatch(initEnvironment());
      dispatch(getPosts2());
    },
    onToggle: (open: boolean) => {
      dispatch(toggleDrawer(open));
      dispatch(resetPage());
    }
  })
)(
  class extends React.Component<
    AppProps & {
      onInit: () => void;
    }
    > {
    componentWillMount() {
      const { onInit } = this.props;
      onInit();
    }
    render() {
      return App(this.props);
    }
  }
);
