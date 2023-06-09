import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { UPDATE_CHANNEL } from "../../actions"
import { Request } from "../../../interfaces"

const updateChannelUrl = ({ channel, serverId }: { channel: any; serverId: any }) => `/channel/${serverId}/${channel}`

function updateChannel(payload: Record<string, unknown>) {
  const { channel, serverId } = payload;
  return axios.put(updateChannelUrl({channel,serverId}), payload)
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
