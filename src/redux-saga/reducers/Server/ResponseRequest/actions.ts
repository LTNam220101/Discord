import { RESPONSE_REQUEST_FAILED, RESPONSE_REQUEST_SUCCESS } from "./reducers"
import { RESPONSE_REQUEST } from "../../../actions"

export const responseRequest = (payload: any, componentId?: string) => ({
  type: RESPONSE_REQUEST,
  response: {
    success: {
      type: RESPONSE_REQUEST_SUCCESS
    },
    failure: {
      type: RESPONSE_REQUEST_FAILED
    }
  },
  payload,
  componentId,
  loading: true
})
