import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_CHANNEL_ROLE_INFO } from "../../actions"
import { Request } from "../../../interfaces"

const getChannelRoleInfoUrl = (channelId: any, roleId: any) => `/channel/${channelId}/role/${roleId}`

function getChannelRoleInfo(payload: Record<string, unknown>) {
  return axios.get(getChannelRoleInfoUrl(payload.channelId, payload.roleId))
}

function* doGetChannelRoleInfo(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(getChannelRoleInfo, request.payload!)
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

export default function* watchGetChannelRoleInfo() {
  yield takeLatest(GET_CHANNEL_ROLE_INFO, doGetChannelRoleInfo)
}
