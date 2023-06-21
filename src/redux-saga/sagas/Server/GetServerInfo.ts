import { getServerInfoSuccess, getServerInfoFailure, GET_SERVER_INFO } from './../../actions';
import axios from '../BaseApi';
import { put, takeLatest, call } from "redux-saga/effects";
import { LISTJOINSERVER, listJoinedServerFailure, listJoinedServerSuccess, signinFailure } from "../../actions";
import { Request } from '../../../interfaces';
import instance from '../Base';
import initialState from './reducers';

const signupUrl = `/auth/sign-in`;

const getServerInfo = async (payload:{id:string}) => {
    try {
      const { data } = await instance.get(`/server/${payload.id}`);
  
      // Lưu danh sách server vào localStorage
      saveListJoinedServerToLocalStorage(data);
        
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Hàm lưu danh sách server vào localStorage
  const saveListJoinedServerToLocalStorage = (currentServer:any) => {
    const storedState = localStorage.getItem("initialState");
    const parsedState = storedState ? JSON.parse(storedState) : {};
  
    const updatedState = {
      ...parsedState,
      currentServer,
    };
  
    localStorage.setItem("initialState", JSON.stringify(updatedState));
  };
  
function* doGetServerInfo(request: Request<{id:string }>): any {
    try {
        if (request.payload) {

            const response = yield call(getServerInfo, { id: request.payload?.id as string });
            console.log(response)
            yield put(
                getServerInfoSuccess({
                    response,
                })
            );

            // localStorage.setItem('accessToken',response.accessToken);

        }
    } catch (e: any) {
        yield put(
            getServerInfoFailure({
                error: e.message,
            })
        );
    }
}

export default function* watchGetServerInfo() {
    yield takeLatest(GET_SERVER_INFO, doGetServerInfo);
}
