import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { ADD_USER_TO_SERVER_ROLE } from "../../actions"
import { Request } from "../../../interfaces"

const addUserToServerRoleUrl = (server: any, role: any) =>
  `/server/${server}/user-role/${role}`

function addUserToServerRole(payload: Record<string, unknown>) {
  return axios.put(
    addUserToServerRoleUrl(payload.serverId, payload.roleId),   
    payload
  )
}

function* doAddUserToServerRole(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(addUserToServerRole, request.payload!)
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

export default function* watchAddUserToServerRole() {
  yield takeLatest(ADD_USER_TO_SERVER_ROLE, doAddUserToServerRole)
}
