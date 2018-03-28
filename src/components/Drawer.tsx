import * as React from 'react';
import { Drawer as MDrawer, List, ListItem, Divider } from 'material-ui';
import { Link } from 'react-router-dom';
import ListExampleSimple from './examples/ListExampleSimple';


declare module 'react' {
    interface DOMAttributes<T> {
        onTouchTap?: React.EventHandler<React.TouchEvent<T>>;
    }
}

export default class Drawer extends React.Component<{
    open:boolean
    onRequestChange: ( open: boolean)=>void
}> {
    render() {
        const onRequestChange = this.props.onRequestChange;
        const close = ()=> onRequestChange(false);
        return <MDrawer
            docked={false}
            open={this.props.open}
            onRequestChange={onRequestChange}
        >
            <List>
            <ListItem
                    primaryText="Home(Api With Grid)"
                    containerElement={<Link to="/" />}
                    onTouchTap={close}
                />
                <ListItem
                    primaryText="Contact(Validation With Form)"
                    containerElement={<Link to="/contact" />}
                    onTouchTap={close}
                />
                <ListItem
                    primaryText="About(UI色々)"
                    containerElement={<Link to="/about" />}
                    onTouchTap={close}
                />
                <ListItem
                    primaryText="Topics(サブルーター)"
                    containerElement={<Link to="/topics" />}
                    onTouchTap={close}
                />
                <Divider />
                <ListItem
                    primaryText='Item 2'
                    nestedItems={
                        [<ListItem
                            key='0'
                            primaryText="Home"
                            containerElement={<Link to="/" />}
                            onTouchTap={close}
                        />,
                        <ListItem
                            key='1'
                            primaryText="topics"
                            containerElement={<Link to="/topics" />}
                            onTouchTap={close}
                        />
                        ]
                    }
                />
                <ListItem
                    primaryText='Item 3'
                    nestedItems={
                        [
                            <ListItem key='0' value="V3-1" primaryText="T3-1" onTouchTap={close} />,
                            <ListItem key='1' value="V3-2" primaryText="T3-2" onTouchTap={close} />
                        ]
                    }
                />
            </List>
            <Divider />
            <ListExampleSimple/>
        </MDrawer>
    }
}