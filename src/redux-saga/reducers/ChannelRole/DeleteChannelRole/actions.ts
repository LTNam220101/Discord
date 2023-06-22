import { DELETE_CHANNEL_ROLE_FAILED, DELETE_CHANNEL_ROLE_SUCCESS } from "./reducers"
import { DELETE_CHANNEL_ROLE } from "../../../actions"

export const deleteChannelRole = (payload: any, componentId?: string) => ({
  type: DELETE_CHANNEL_ROLE,
  response: {
    success: {
      type: DELETE_CHANNEL_ROLE_SUCCESS
    },
    failure: {
      type: DELETE_CHANNEL_ROLE_FAILED
    }
  },
  payload,
  componentId,
  loading: true
})
