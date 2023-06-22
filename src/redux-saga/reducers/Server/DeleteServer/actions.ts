import { DELETE_SERVER_FAILED, DELETE_SERVER_SUCCESS } from "./reducers"
import { DELETE_SERVER } from "../../../actions"

export const deleteServer = (payload: any, componentId?: string) => ({
  type: DELETE_SERVER,
  response: {
    success: {
      type: DELETE_SERVER_SUCCESS
    },
    failure: {
      type: DELETE_SERVER_FAILED
    }
  },
  payload,
  componentId,
  loading: true
})
