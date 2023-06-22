import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { UPDATE_SERVER_ROLE } from "../../actions"
import { Request } from "../../../interfaces"

const updateServerRoleUrl = (server: any, role: any) =>
  `/server/${server}/roles/${role}`

function updateServerRole(payload: Record<string, unknown>) {
  return axios.put(
    updateServerRoleUrl(payload.serverId, payload.roleId),   
    payload
  )
}

function* doUpdateServerRole(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(updateServerRole, request.payload!)
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

export default function* watchUpdateServerRole() {
  yield takeLatest(UPDATE_SERVER_ROLE, doUpdateServerRole)
}
