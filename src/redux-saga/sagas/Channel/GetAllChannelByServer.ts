import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_ALL_CHANNEL_BY_SERVER } from "../../actions"
import { Request } from "../../../interfaces"

const getAllChannelByServerUrl = (serverId: any) => `/channel/getAll/${serverId}`

function getAllChannelByServer(payload: Record<string, unknown>) {
  return axios.get(getAllChannelByServerUrl(payload.serverId))
}

function* doGetAllChannelByServer(
  request: Request<Record<string, unknown>>
): any {
  try {
    const response = yield call(getAllChannelByServer, request.payload!)
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

export default function* watchGetAllChannelByServer() {
  yield takeLatest(GET_ALL_CHANNEL_BY_SERVER, doGetAllChannelByServer)
}
