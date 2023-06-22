import { GET_SERVER_ROLE_FAILED, GET_SERVER_ROLE_SUCCESS } from './reducers';
import { GET_SERVER_ROLE } from '../../../actions';

export const getServerRole = (payload: any, componentId?: string) => ({
  type: GET_SERVER_ROLE,
  response: {
    success: {
      type: GET_SERVER_ROLE_SUCCESS,
    },
    failure: {
      type: GET_SERVER_ROLE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});