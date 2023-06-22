import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_USER } from "./../../actions"
import { Request } from "../../../interfaces"

const getUserUrl = (userId: any) => `/user/${userId}`

function getUser(payload: Record<string, unknown>) {
  return axios.get(getUserUrl(payload.userId))
}

function* doGetUser(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(getUser, request.payload!)
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

export default function* watchGetUser() {
  yield takeLatest(GET_USER, doGetUser)
}
