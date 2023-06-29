import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { AUTH_LOGOUT } from "./../../actions"
import { Request } from "../../../interfaces"

const signupUrl = `/auth/sign-out`

function logout(payload: Record<string, unknown>) {
  return axios.post(signupUrl, payload)
}

function* doLogout(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(logout, request.payload!)
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

export default function* watchLogout() {
  yield takeLatest(AUTH_LOGOUT, doLogout)
}
