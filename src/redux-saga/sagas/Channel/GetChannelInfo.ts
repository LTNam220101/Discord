import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_CHANNEL_INFO } from "../../actions"
import { Request } from "../../../interfaces"

const getChannelInfoUrl = (channel: any) => `/channel/${channel}`

function getChannelInfo(payload: Record<string, unknown>) {
  return axios.get(getChannelInfoUrl(payload.channel))
}

function* doGetChannelInfo(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(getChannelInfo, request.payload!)
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

export default function* watchGetChannelInfo() {
  yield takeLatest(GET_CHANNEL_INFO, doGetChannelInfo)
}
