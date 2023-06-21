import axios from "../BaseApi";
import { put, takeLatest, call } from "redux-saga/effects";
import { AUTH_REGISTER } from "./../../actions";
import { Request } from "../../../interfaces";
import { signupSuccess,signupFailure } from "./../../actions";
const signupUrl = `/auth/sign-up`;

// function register(payload: Record<string, unknown>) {
//   console.log(payload)

//   console.log(axios.post("http://localhost:3000/auth/sign-up", payload));

// }
const register = async (payload:{ email: string, password: string, username: string, repass: string }) => {
  const { data } = await axios.post(
    "http://localhost:3000/auth/sign-up",
    { ...payload },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  // localStorage.setItem('userInfo', JSON.stringify(data));
  console.log(data)
  console.log(payload)
  return data;
  
};

function* doRegister(request: Request<{ email: string, password: string, username: string, repass: string }>): any {
  
  try {
    if (request.payload) {
     
      const response = yield call(register, {
        email: request.payload.email as string,
        password: request.payload.password as string,
        username: request.payload.username as string,
        repass: request.payload.repass as string
      });
      yield put(
        signupSuccess({
          username: response.username,
          email: response.email,
          password: response.password,
          repass: response.repass,
        })
      );
      
      // localStorage.setItem('username',response.username);

    }
    // yield put({
    //   type: request.response?.success?.type,
    //   payload: {
    //     request: request.payload,
    //     componentId: request.componentId,
    //     response: response.data
    //   }
    // });
    
  } catch (e: any) {
    yield put(
      signupFailure({
        error: e.message,
      })
    );
  }
}


export default function* watchRegister() {
  yield takeLatest(AUTH_REGISTER, doRegister);
}
