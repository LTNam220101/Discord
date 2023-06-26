import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { JOIN_WITH_LINK } from "./../../actions"
import { Request } from "../../../interfaces"

const joinWithLinkUrl = (code: any) => `/user/invite/${code}`

function joinWithLink(payload: Record<string, unknown>) {
  return axios.get(joinWithLinkUrl(payload.code))
}

function* doJoinWithLink(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(joinWithLink, request.payload!)
    console.log(response)
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

export default function* watchJoinWithLink() {
  yield takeLatest(JOIN_WITH_LINK, doJoinWithLink)
}
