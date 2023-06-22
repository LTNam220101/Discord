import { DELETE_CHANNEL_FAILED, DELETE_CHANNEL_SUCCESS } from "./reducers"
import { DELETE_CHANNEL } from "../../../actions"

export const deleteChannel = (payload: any, componentId?: string) => ({
  type: DELETE_CHANNEL,
  response: {
    success: {
      type: DELETE_CHANNEL_SUCCESS
    },
    failure: {
      type: DELETE_CHANNEL_FAILED
    }
  },
  payload,
  componentId,
  loading: true
})
