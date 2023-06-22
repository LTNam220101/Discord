import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { RESPONSE_REQUEST } from "../../actions"
import { Request } from "../../../interfaces"

const responseRequestUrl = `/server/response-requests`

function responseRequest(payload: Record<string, unknown>) {
  return axios.post(responseRequestUrl, payload)
}

function* doResponseRequest(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(responseRequest, request.payload!)
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

export default function* watchResponseRequest() {
  yield takeLatest(RESPONSE_REQUEST, doResponseRequest)
}
