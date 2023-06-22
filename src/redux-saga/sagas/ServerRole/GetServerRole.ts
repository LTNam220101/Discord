import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_SERVER_ROLE } from "../../actions"
import { Request } from "../../../interfaces"

const getServerRoleUrl = (server: any, role: any) =>
  `/server/${server}/roles/${role}`

function getServerRole(payload: Record<string, unknown>) {
  return axios.get(getServerRoleUrl(payload.serverId, payload.role))
}

function* doGetServerRole(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(getServerRole, request.payload!)
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

export default function* watchGetServerRole() {
  yield takeLatest(GET_SERVER_ROLE, doGetServerRole)
}
