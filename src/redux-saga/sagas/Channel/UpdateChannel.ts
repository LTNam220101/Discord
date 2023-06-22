import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { UPDATE_CHANNEL } from "../../actions"
import { Request } from "../../../interfaces"

const updateChannelUrl = (channel: any) => `/channel/${channel}`

function updateChannel(payload: Record<string, unknown>) {
  return axios.put(updateChannelUrl(payload.channel), payload)
}

function* doUpdateChannel(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(updateChannel, request.payload!)
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

export default function* watchUpdateChannel() {
  yield takeLatest(UPDATE_CHANNEL, doUpdateChannel)
}
