import axios from '../BaseApi';
import { put, takeLatest, call } from "redux-saga/effects";
import { LISTJOINSERVER, listJoinedServerFailure, listJoinedServerSuccess, signinFailure } from "../../actions";
import { Request } from '../../../interfaces';
import instance from '../Base';
import initialState from './reducers';

const signupUrl = `/auth/sign-in`;

const listJoinServer = async () => {
    try {
      const { data } = await instance.get("/server/get-servers-by-user");
  
      // Lưu danh sách server vào localStorage
      saveListJoinedServerToLocalStorage(data.data);
  
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Hàm lưu danh sách server vào localStorage
  const saveListJoinedServerToLocalStorage = (listJoinedServer:any) => {
    const storedState = localStorage.getItem("initialState");
    const parsedState = storedState ? JSON.parse(storedState) : {};
  
    const updatedState = {
      ...parsedState,
      listJoinedServer,
    };
  
    localStorage.setItem("initialState", JSON.stringify(updatedState));
  };
  
function* doListJoinServer(request: any): any {
    try {
        if (request) {

            const response = yield call(listJoinServer);
            console.log(response)
            yield put(
                listJoinedServerSuccess({
                    response,
                })
            );

            // localStorage.setItem('accessToken',response.accessToken);

        }
    } catch (e: any) {
        yield put(
            listJoinedServerFailure({
                error: e.message,
            })
        );
    }
}

export default function* watchListJoinServer() {
    yield takeLatest(LISTJOINSERVER, doListJoinServer);
}
