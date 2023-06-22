import { GET_LIST_SERVER_JOINED } from "./../../redux-saga/actions"
import {
  GET_LIST_SERVER_JOINED_FAILED,
  GET_LIST_SERVER_JOINED_SUCCESS
} from "./reducers"

export const getListServerJoined = (payload?: any, componentId?: string) => ({
  type: GET_LIST_SERVER_JOINED,
  response: {
    success: {
      type: GET_LIST_SERVER_JOINED_SUCCESS
    },
    failure: {
      type: GET_LIST_SERVER_JOINED_FAILED
    }
  },
  payload,
  componentId,
  loading: true
})
