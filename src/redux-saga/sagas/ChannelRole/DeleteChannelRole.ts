import { call, put, takeLatest } from "redux-saga/effects"
import { Request } from "../../../interfaces"
import { DELETE_CHANNEL_ROLE } from "../../actions"
import axios from "../BaseApi"

const deleteChannelRoleUrl = (channelId: any, roleId: any) => `/channel/${channelId}/role/${roleId}`

function deleteChannelRole(payload: Record<string, unknown>) {
  return axios.delete(deleteChannelRoleUrl(payload.channelId, payload.roleId), payload)
}

function* doDeleteChannelRole(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(deleteChannelRole, request.payload!)
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

export default function* watchDeleteChannelRole() {
  yield takeLatest(DELETE_CHANNEL_ROLE, doDeleteChannelRole)
}
