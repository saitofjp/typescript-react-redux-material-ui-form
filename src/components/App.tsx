import * as React from "react";
import { HashRouter } from "react-router-dom";
// import { BrowserRouter as Router, HashRouter } from "react-router-dom";
import { AppBar } from "material-ui";

import Drawer from "../components/Drawer";
import Routes from "./Routes";

import "./App.css";

export interface AppProps {
  drawerOpen: boolean;
  onToggle: (request: boolean) => void;
}
const App = (props: AppProps) => {
  const { drawerOpen, onToggle } = props;
  const onOpen = () => onToggle(true);
  return (
    <HashRouter>
      <div className="app">
        <Drawer open={drawerOpen} onRequestChange={onToggle} />
        <AppBar title="TypeScript + Redux + Router + MaterialUi + Flexboxgrid" onLeftIconButtonClick={onOpen} />
        <div className="content">
          <Routes />
        </div>
      </div>
    </HashRouter>
  );
};
export default App;
