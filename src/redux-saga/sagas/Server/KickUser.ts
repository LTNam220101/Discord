
import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { CREATE_SERVER, KICK_USER } from "./../../actions"
import { Request } from "../../../interfaces"


const kickUserUrl = `/server/kick-user`

function kickUser(payload: Record<string, unknown>) {
  return axios.put(kickUserUrl, payload)
}

function* doKickUser(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(kickUser, request.payload!)
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

export default function* watchKickUser() {
  yield takeLatest(KICK_USER, doKickUser)
}
