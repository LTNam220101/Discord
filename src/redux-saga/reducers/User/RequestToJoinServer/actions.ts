import { REQUEST_TO_JOIN_SERVER_FAILED, REQUEST_TO_JOIN_SERVER_SUCCESS } from './reducers';
import { REQUEST_TO_JOIN_SERVER } from '../../../actions';

export const requestToJoinServer = (payload: any, componentId?: string) => ({
  type: REQUEST_TO_JOIN_SERVER,
  response: {
    success: {
      type: REQUEST_TO_JOIN_SERVER_SUCCESS,
    },
    failure: {
      type: REQUEST_TO_JOIN_SERVER_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});