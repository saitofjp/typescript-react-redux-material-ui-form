
import React from 'react';
import ReactDOM from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin'; // おまじない

import registerServiceWorker from './registerServiceWorker';
import App from './App';

injectTapEventPlugin(); // おまじない


ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <App />
    </MuiThemeProvider>
,   document.getElementById( 'root' )
);
registerServiceWorker();