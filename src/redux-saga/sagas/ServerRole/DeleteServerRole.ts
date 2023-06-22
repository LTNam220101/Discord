import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { DELETE_SERVER_ROLE } from "../../actions"
import { Request } from "../../../interfaces"

const deleteServerRoleUrl = (server: any, role: any) =>
  `/server/${server}/roles/${role}`

function deleteServerRole(payload: Record<string, unknown>) {
  return axios.delete(
    deleteServerRoleUrl(payload.serverId, payload.roleId),
    payload
  )
}

function* doDeleteServerRole(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(deleteServerRole, request.payload!)
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

export default function* watchDeleteServerRole() {
  yield takeLatest(DELETE_SERVER_ROLE, doDeleteServerRole)
}
