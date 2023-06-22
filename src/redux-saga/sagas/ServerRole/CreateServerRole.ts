import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { CREATE_SERVER_ROLE } from "../../actions"
import { Request } from "../../../interfaces"

const createServerRoleUrl = (server: any) =>
  `/server/${server}/roles`

function createServerRole(payload: Record<string, unknown>) {
  return axios.post(
    createServerRoleUrl(payload.serverId),
    payload
  )
}

function* doCreateServerRole(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(createServerRole, request.payload!)
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

export default function* watchCreateServerRole() {
  yield takeLatest(CREATE_SERVER_ROLE, doCreateServerRole)
}
