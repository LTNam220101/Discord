import axios from '../BaseApi';
import { put, takeLatest, call } from "redux-saga/effects";
import { AUTH_LOGIN, signinFailure, signinSuccess } from "./../../actions";
import { Request } from '../../../interfaces';

const signupUrl = `/auth/sign-in`;

const login = async (payload:{password: string, username: string}) => {
  console.log(payload)
  const { data } = await axios.post(
    "http://localhost:3000/auth/sign-in",
    { ...payload },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  localStorage.setItem('userInfo', JSON.stringify(data));
  console.log(data)
  console.log(payload)
  return data;
  
};
function* doLogin(request: Request<{password: string, username: string}>): any {
  try {
    if (request.payload) {
     
      const response = yield call(login, {
        password: request.payload.password as string,
        username: request.payload.username as string,
      });
      console.log("respone",response)
      yield put(
        signinSuccess({
          response,
        })
      );
      
      // localStorage.setItem('accessToken',response.accessToken);

    }
  } catch (e: any) {
    yield put(
      signinFailure({
        error: e.message,
      })
    );
  }
}

export default function* watchLogin() {
  yield takeLatest(AUTH_LOGIN, doLogin);
}
