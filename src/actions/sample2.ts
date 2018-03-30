
import actionCreatorFactory from 'typescript-fsa';

import { Posts } from '../adapter/post';

//sample3のモデルと兼用してるよ


//腐敗層(containers)で変換にするべき
import { MaterialUiFormData } from '../components/MaterialUiForm';


const actionCreator = actionCreatorFactory("Sample2");

export const requestList = actionCreator<Posts>("REQUEST_LIST");
export const receiveList = actionCreator<Posts | Error>("RECEIVE_LIST");
export const receivePosts = actionCreator<Posts>("RECEIVE_POSTS");
export const resetPage = actionCreator("REST_PAGE");
export const saveData = actionCreator<MaterialUiFormData>("SAVE_DATA");

