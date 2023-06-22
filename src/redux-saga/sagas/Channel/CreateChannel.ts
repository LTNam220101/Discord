import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { CREATE_CHANNEL } from "./../../actions"
import { Request } from "../../../interfaces"

const createChannelUrl = `/channel`

function createChannel(payload: Record<string, unknown>) {
  return axios.post(createChannelUrl, payload)
}

function* doCreateChannel(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(createChannel, request.payload!)
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

export default function* watchCreateChannel() {
  yield takeLatest(CREATE_CHANNEL, doCreateChannel)
}
