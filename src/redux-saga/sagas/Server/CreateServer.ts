import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { CREATE_SERVER } from "./../../actions"
import { Request } from "../../../interfaces"

const createServerUrl = `/server`

function createServer(payload: Record<string, unknown>) {
  return axios.post(createServerUrl, payload)
}

function* doCreateServer(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(createServer, request.payload!)
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

export default function* watchCreateServer() {
  yield takeLatest(CREATE_SERVER, doCreateServer)
}
