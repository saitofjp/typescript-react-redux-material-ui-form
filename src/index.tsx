import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as injectTapEventPlugin from "react-tap-event-plugin";

import registerServiceWorker from "./registerServiceWorker";

import "flexboxgrid/css/flexboxgrid.css";

import App from "./containers/App";
import configureStore from "./store/configureStore";
import { Store } from "redux";
import { State } from "./reducers";

injectTapEventPlugin();

// TODO https://github.com/mui-org/material-ui/blob/v1-beta/examples/create-react-app/src/withRoot.js;

let store: Store<State> = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
