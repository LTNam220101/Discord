import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { SEND_MESSAGE } from "./../../actions"
import { Request } from "../../../interfaces"

const sendMessageUrl = (channelId: any) => `/message/${channelId}`

function sendMessage(payload: Record<string, unknown>) {
  return axios.post(sendMessageUrl(payload.channelId), payload)
}

function* doSendMessage(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(sendMessage, request.payload!)
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

export default function* watchSendMessage() {
  yield takeLatest(SEND_MESSAGE, doSendMessage)
}
