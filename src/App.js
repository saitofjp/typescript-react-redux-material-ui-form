import React, { Component } from 'react';
import { AppBar, Drawer, List, ListItem } from 'material-ui';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const
Contact = () => <h2>----------------------------------Contact</h2>;

const
About = () => <h2>----------------------------------About</h2>;

const
Home = () => <h2>----------------------------------Home</h2>;

const
Topic = ( { match } ) => <h3>{match.params.topicId}</h3>;

const
Topics = ( { match } ) => <div>
    <h2>Topics</h2>
    <List>
        <ListItem containerElement={ <Link to={`${match.url}/rendering`} /> } primaryText='Rendering with React' />
        <ListItem containerElement={ <Link to={`${match.url}/components`} /> } primaryText='Components' />
        <ListItem containerElement={ <Link to={`${match.url}/props-v-state`} /> } primaryText='Props v. State' />
    </List>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={ () => <h3>Please select a topic.</h3> } />
</div>;

export default class
App extends Component {
    componentWillMount() {
        this.setState( { drawerOpen: false } );
    }
    handleOpen = () => { this.setState( { drawerOpen: true } ); };
    handleClose = () => { this.setState( { drawerOpen: false } ); };
    render() {
        return <Router>
            <div>
                <Drawer
                    docked={ false }
                    open={ this.state.drawerOpen }
                    containerStyle={ { top: 64 } }
                    onRequestChange={ this.handleClose }
                >
                    <List>
                        <ListItem
                            primaryText='Item 1'
                            nestedItems={
                                [   <ListItem
                                        key='0'
                                        primaryText="Contact"
                                        containerElement={<Link to="/contact" />}
                                        onTouchTap={ this.handleClose }
                                    />
                                ,   <ListItem
                                        key='1'
                                        primaryText="About"
                                        containerElement={<Link to="/about" />}
                                        onTouchTap={ this.handleClose }
                                    />
                                ]
                            }
                        />
                        <ListItem
                            primaryText='Item 2'
                            nestedItems={
                                [   <ListItem
                                        key='0'
                                        primaryText="Home"
                                        containerElement={<Link to="/" />}
                                        onTouchTap={ this.handleClose }
                                    />
                                ,   <ListItem
                                        key='1'
                                        primaryText="topics"
                                        containerElement={<Link to="/topics" />}
                                        onTouchTap={ this.handleClose }
                                    />
                                ]
                            }
                        />
                        <ListItem
                            primaryText='Item 3'
                            nestedItems={
                                [   <ListItem key='0' value="V3-1" primaryText="T3-1" onTouchTap={ this.handleClose } />
                                ,   <ListItem key='1' value="V3-2" primaryText="T3-2" onTouchTap={ this.handleClose } />
                                ]
                            }
                        />
                    </List>
                </Drawer>

                <AppBar
                    title="CRA"
                    onLeftIconButtonClick ={ this.handleOpen }
                />

                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/topics" component={Topics}/>
            </div>
        </Router>;
    }
}