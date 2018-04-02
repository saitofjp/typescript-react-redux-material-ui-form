import 'rxjs';
import 'typescript-fsa-redux-observable'; // <-- here
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { State } from '../reducers';
import { scrollBottom, initEnvironment } from '../actions/environment';


export const initEnvironmentEpic: Epic<Action, State> =
  (action$, { dispatch, getState }) => action$.ofAction(initEnvironment)
    .do(_ => {
      window.onscroll = () => {
        if (touchBottom()) {
          dispatch(scrollBottom());
        };
      };
    })
    .ignoreElements();


//ただのコピペ
function touchBottom(): boolean {
  const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
  const body = document.body;
  const html = document.documentElement;
  const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  const windowBottom = windowHeight + window.pageYOffset;
  const touchBottom = windowBottom >= docHeight;
  return touchBottom;
}
