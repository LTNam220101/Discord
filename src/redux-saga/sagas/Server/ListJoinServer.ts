import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_LIST_SERVER_JOINED } from "./../../actions"
import { Request } from "../../../interfaces"

const getListServerJoinedUrl = `/server/get-servers-by-user`

function getListServerJoined(payload: Record<string, unknown>) {
  return axios.get(getListServerJoinedUrl)
}

function* doGetListServerJoined(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(getListServerJoined, request.payload!)
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

export default function* watchGetListServerJoined() {
  yield takeLatest(GET_LIST_SERVER_JOINED, doGetListServerJoined)
}
