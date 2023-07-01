
import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { DELETE_SERVER } from "./../../actions"
import { Request } from "../../../interfaces"
import { getListServerJoined } from "../../../components/ServersList/actions"

const deleteServerUrl = (serverId: any) => `/server/delete/${serverId}`

function deleteServer(payload: Record<string, unknown>) {
  return axios.delete(deleteServerUrl(payload.serverId))
}

function* doDeleteServer(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(deleteServer, request.payload!)
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

export default function* watchDeleteServer() {
  yield takeLatest(DELETE_SERVER, doDeleteServer)
}
