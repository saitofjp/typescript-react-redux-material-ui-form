import { createStore, applyMiddleware, compose } from 'redux';
// import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer, { State } from '../reducers';
import { Store } from 'react-redux';
import { bindActionDispatcher } from '../moderators';

//https://github.com/rakshithmm23/local/blob/master/src/store/configureStore.js


//https://github.com/reactjs/redux/issues/2359
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose


const finalCreateStore = composeSetup(
  // applyMiddleware(promiseMiddleware, thunk),
  applyMiddleware(thunk,bindActionDispatcher),
  // reduxReactRouter({ routes, createHistory })
)(createStore);

export default function configureStore(initialState?:State):Store<State> {
  return finalCreateStore(rootReducer, initialState);
}