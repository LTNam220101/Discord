import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { CREATE_CHANNEL_ROLE } from "../../actions"
import { Request } from "../../../interfaces"

const createChannelRoleUrl = (channelId: any) => `/channel/${channelId}/role`

function createChannelRole(payload: Record<string, unknown>) {
  return axios.post(createChannelRoleUrl(payload.channelId), payload)
}

function* doCreateChannelRole(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(createChannelRole, request.payload!)
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

export default function* watchCreateChannelRole() {
  yield takeLatest(CREATE_CHANNEL_ROLE, doCreateChannelRole)
}
