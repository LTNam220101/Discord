import { GET_SERVERS_PUBLIC_FAILED, GET_SERVERS_PUBLIC_SUCCESS } from "./reducers"
import { GET_SERVERS_PUBLIC } from "../../../actions"

export const getServersPublic = (payload?: any, componentId?: string) => ({
  type: GET_SERVERS_PUBLIC,
  response: {
    success: {
      type: GET_SERVERS_PUBLIC_SUCCESS
    },
    failure: {
      type: GET_SERVERS_PUBLIC_FAILED
    }
  },
  payload,
  componentId,
  loading: true
})
