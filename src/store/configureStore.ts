import { createStore, applyMiddleware, compose } from 'redux';
// import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer, { State } from '../reducers';
import { Store } from 'react-redux';
// import { epicMiddleware } from '../epics';
import { actionChainMiddleware } from '../moderators';
import {  routerMiddleware } from 'react-router-redux';
import { history } from '../history';

//https://github.com/rakshithmm23/local/blob/master/src/store/configureStore.js


// Build the middleware for intercepting and dispatching navigation actions
 const middleware = routerMiddleware(history)

//https://github.com/reactjs/redux/issues/2359
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose


const finalCreateStore = composeSetup(
  // applyMiddleware( thunk, epicMiddleware),
  applyMiddleware(thunk, actionChainMiddleware ,middleware ),
  // reduxReactRouter({ routes, createHistory })
)(createStore);

export default function configureStore(initialState?:State):Store<State> {
  return finalCreateStore(rootReducer, initialState);
}