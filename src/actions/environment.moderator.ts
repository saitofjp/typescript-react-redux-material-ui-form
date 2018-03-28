import { ThunkAction } from './moderator';
import { scrollBottom } from './environment';

export const initEnvironment = (): ThunkAction<void> => (dispatch) => {
  window.onscroll = () => {
    if (touchBottom()) {
      dispatch(scrollBottom());
    };
  };
};

//ただのコピペ
function touchBottom() :boolean {
  const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
  const body = document.body;
  const html = document.documentElement;
  const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  const windowBottom = windowHeight + window.pageYOffset;
  const touchBottom = windowBottom >= docHeight;
  return touchBottom;
}
