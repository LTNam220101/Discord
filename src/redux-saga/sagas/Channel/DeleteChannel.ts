import { call, put, takeLatest } from "redux-saga/effects"
import { Request } from "../../../interfaces"
import { DELETE_CHANNEL } from "../../actions"
import axios from "../BaseApi"

const deleteChannelUrl = (channelId: any) => `/channel/${channelId}`

function deleteChannel(payload: Record<string, unknown>) {
  return axios.delete(deleteChannelUrl(payload.channelId), payload)
}

function* doDeleteChannel(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(deleteChannel, request.payload!)
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

export default function* watchDeleteChannel() {
  yield takeLatest(DELETE_CHANNEL, doDeleteChannel)
}
