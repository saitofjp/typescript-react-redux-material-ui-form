import * as React from "react";
import { List, ListItem } from "material-ui";
import { Route, Link, match } from "react-router-dom";

interface TopicParam {
  topicId: string;
}
const Topic = ({ match }: { match: match<TopicParam> }) => (
  <h3>{match.params.topicId}</h3>
);

export const Topics = ({ match }: { match: match<{}> }) => (
  <div>
    <h2>Topics</h2>
    <List>
      <ListItem
        containerElement={<Link to={`${match.url}/rendering`} />}
        primaryText="Rendering with React"
      />
      <ListItem
        containerElement={<Link to={`${match.url}/components`} />}
        primaryText="Components"
      />
      <ListItem
        containerElement={<Link to={`${match.url}/props-v-state`} />}
        primaryText="Props v. State"
      />
    </List>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);
