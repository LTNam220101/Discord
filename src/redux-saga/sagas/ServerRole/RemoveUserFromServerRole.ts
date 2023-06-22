import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { REMOVE_USER_FROM_SERVER_ROLE } from "../../actions"
import { Request } from "../../../interfaces"

const removeUserFromServerRoleUrl = (server: any, role: any, user: any) =>
  `/server/${server}/user-role/${role}/${user}`

function removeUserFromServerRole(payload: Record<string, unknown>) {
  return axios.delete(
    removeUserFromServerRoleUrl(
      payload.serverId,
      payload.roleId,
      payload.userId
    ),
    payload
  )
}

function* doRemoveUserFromServerRole(
  request: Request<Record<string, unknown>>
): any {
  try {
    const response = yield call(removeUserFromServerRole, request.payload!)
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

export default function* watchRemoveUserFromServerRole() {
  yield takeLatest(REMOVE_USER_FROM_SERVER_ROLE, doRemoveUserFromServerRole)
}
