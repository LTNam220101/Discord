import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_ALL_MESSAGE } from "./../../actions"
import { Request } from "../../../interfaces"

const getAllMessageUrl = (channelId: any) => `/message/${channelId}`

function getAllMessage(payload: Record<string, unknown>) {
  return axios.get(getAllMessageUrl(payload.channelId), payload)
}

function* doGetAllMessage(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(getAllMessage, request.payload!)
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

export default function* watchGetAllMessage() {
  yield takeLatest(GET_ALL_MESSAGE, doGetAllMessage)
}
