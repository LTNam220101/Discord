import { Channel } from './../../../components/Video/VideoInterface';
import axios from "../BaseApi"
import { put, takeLatest, call } from "redux-saga/effects"
import { GET_CHANNEL_INFO } from "../../actions"
import { Request } from "../../../interfaces"

const getChannelInfoUrl = ({channel,serverId}:{channel:any,serverId:any}) => `/channel/${serverId}/${channel}`

function getChannelInfo(payload: Record<string, unknown>) {
  const {serverId,channel}=payload;
  console.log(payload)
  return axios.get(getChannelInfoUrl({channel,serverId}))
}

function* doGetChannelInfo(request: Request<Record<string, unknown>>): any {
  try {
    const response = yield call(getChannelInfo, request.payload!)
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

export default function* watchGetChannelInfo() {
  yield takeLatest(GET_CHANNEL_INFO, doGetChannelInfo)
}
