
import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { CREATE_INVITE } from "./../../actions"
import { Request } from "../../../interfaces"
import instance from "../BaseApi"

const createInviteUrl = (serverId: any) => `/server/create-invite/${serverId}`

function createInvite(payload: Record<string, unknown>) {
  return axios.post(createInviteUrl(payload.serverId), payload)
}

function* doCreateInvite(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(createInvite, request.payload!)
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

export default function* watchCreateInvite() {
  yield takeLatest(CREATE_INVITE, doCreateInvite)
}
