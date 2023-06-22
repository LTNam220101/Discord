import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_ALL_SERVER_ROLES } from "../../actions"
import { Request } from "../../../interfaces"

const getAllServerRoleUrl = (server: any) => `/server/${server}/roles`

function getAllServerRole(payload: Record<string, unknown>) {
  return axios.get(getAllServerRoleUrl(payload.serverId))
}

function* doGetAllServerRole(
  request: Request<Record<string, unknown>>
): any {
  try {
    const response = yield call(getAllServerRole, request.payload!)
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

export default function* watchGetAllServerRole() {
  yield takeLatest(GET_ALL_SERVER_ROLES, doGetAllServerRole)
}
