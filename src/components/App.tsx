import * as React from "react";
// import { BrowserRouter as Router, HashRouter } from "react-router-dom";
import { AppBar } from "material-ui";

import Drawer from "../components/Drawer";

import "./App.css";

export interface AppProps extends  React.Props<{}> {
  drawerOpen: boolean;
  onToggle: (request: boolean) => void;
}
const App = (props: AppProps) => {
  const { drawerOpen, onToggle } = props;
  const onOpen = () => onToggle(true);
  return (
      <div className="app">
        <Drawer open={drawerOpen} onRequestChange={onToggle} />
        <AppBar title="TypeScript + Redux + Router + MaterialUi + Flexboxgrid" onLeftIconButtonClick={onOpen} />
        <div className="content">
          {props.children}
        </div>
      </div>
  );
};
export default App;

