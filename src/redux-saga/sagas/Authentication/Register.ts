import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { AUTH_REGISTER } from "./../../actions"
import { Request } from "../../../interfaces"

const signupUrl = `/auth/sign-up`

function register(payload: Record<string, unknown>) {
  return axios.post(signupUrl, payload)
}

function* doRegister(request: Request<{ email: string, password: string, username: string, repass: string }>): any {
  
  try {
    const response = yield call(register, request.payload!)
    yield put({
      type: request.response?.success?.type,
      payload: {
        request: request.payload,
        componentId: request.componentId,
        response: response.data
      }
    })
  } catch (error) {
    console.log(error)
    yield put({
      type: request.response?.failure?.type,
      loading: false,
      payload: {
        request: request.payload,
        componentId: request.componentId,
        response: (error as any).response?.data
      }
    })
  }
}


export default function* watchRegister() {
  yield takeLatest(AUTH_REGISTER, doRegister)
}
