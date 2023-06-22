import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_SERVER_INFO } from "./../../actions"
import { Request } from "../../../interfaces"

const getServerInfoUrl = (serverId: any) => `/server/${serverId}`

function getServerInfo(payload: Record<string, unknown>) {
  return axios.get(getServerInfoUrl(payload.serverId))
}

function* doGetServerInfo(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(getServerInfo, request.payload!)
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

export default function* watchGetServerInfo() {
  yield takeLatest(GET_SERVER_INFO, doGetServerInfo)
}
