import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_ALL_USER_NOT_BELONG_TO_ROLE } from "../../actions"
import { Request } from "../../../interfaces"

const getDetailUserRoleInServerUrl = (server: any, user: any) =>
  `/server/${server}/user-role/${user}`

function getDetailUserRoleInServer(payload: Record<string, unknown>) {
  return axios.get(getDetailUserRoleInServerUrl(payload.serverId, payload.userId))
}

function* doGetDetailUserRoleInServer(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(getDetailUserRoleInServer, request.payload!)
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

export default function* watchGetDetailUserRoleInServer() {
  yield takeLatest(GET_ALL_USER_NOT_BELONG_TO_ROLE, doGetDetailUserRoleInServer)
}
