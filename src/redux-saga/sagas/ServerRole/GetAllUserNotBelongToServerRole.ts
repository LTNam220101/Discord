import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_ALL_USER_NOT_BELONG_TO_ROLE } from "../../actions"
import { Request } from "../../../interfaces"

const getAllUserNotBelongToServerRoleUrl = (server: any, role: any) =>
  `/server/${server}/user-role/users-not-belong/${role}`

function getAllUserNotBelongToServerRole(payload: Record<string, unknown>) {
  return axios.get(getAllUserNotBelongToServerRoleUrl(payload.serverId, payload.roleId))
}

function* doGetAllUserNotBelongToServerRole(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(getAllUserNotBelongToServerRole, request.payload!)
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

export default function* watchGetAllUserNotBelongToServerRole() {
  yield takeLatest(GET_ALL_USER_NOT_BELONG_TO_ROLE, doGetAllUserNotBelongToServerRole)
}
