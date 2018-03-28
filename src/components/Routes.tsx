import * as React from "react";
import { About, Contact } from "./Pages";
import { Switch, Route } from "react-router";
import { Topics } from "./Topic";
import Home from "../containers/Home";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/topics" component={Topics} />
  </Switch>
);

export default Routes;
