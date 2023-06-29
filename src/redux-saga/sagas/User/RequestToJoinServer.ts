import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { REQUEST_TO_JOIN_SERVER } from "../../actions"
import { Request } from "../../../interfaces"

const requestToJoinServerUrl = (serverId: any) => `/user/request-join-server/${serverId}`

function requestToJoinServer(payload: Record<string, unknown>) {
  return axios.get(requestToJoinServerUrl(payload.serverId))
}

function* doJoinWithId(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(requestToJoinServer, request.payload!)
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

export default function* watchJoinWithId() {
  yield takeLatest(REQUEST_TO_JOIN_SERVER, doJoinWithId)
}
