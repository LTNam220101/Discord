import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { UPDATE_SERVER } from "./../../actions"
import { Request } from "../../../interfaces"

const updateServerUrl = (serverId: any) => `/server/${serverId}`

function updateServer(payload: Record<string, unknown>) {
  return axios.post(updateServerUrl(payload.serverId))
}

function* doUpdateServer(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(updateServer, request.payload!)
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

export default function* watchUpdateServer() {
  yield takeLatest(UPDATE_SERVER, doUpdateServer)
}
