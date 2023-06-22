import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_SERVERS_PUBLIC, GET_SERVER_INFO } from "../../actions"
import { Request } from "../../../interfaces"
import instance from "../BaseApi"

const getServersPublicInfoUrl = `/server/get-servers-public`

function getServersPublicInfo(payload: Record<string, unknown>) {
  return instance.get(getServersPublicInfoUrl)
}

function* doGetServersPublicInfo(
  request: Request<Record<string, unknown>>
): any {
  try {
    const response = yield call(getServersPublicInfo, request.payload!)
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

export default function* watchGetServersPublicInfo() {
  yield takeLatest(GET_SERVERS_PUBLIC, doGetServersPublicInfo)
}
