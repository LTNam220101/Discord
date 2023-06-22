import { DELETE_SERVER_ROLE_FAILED, DELETE_SERVER_ROLE_SUCCESS } from './reducers';
import { DELETE_SERVER_ROLE } from '../../../actions';

export const deleteServerRole = (payload: any, componentId?: string) => ({
  type: DELETE_SERVER_ROLE,
  response: {
    success: {
      type: DELETE_SERVER_ROLE_SUCCESS,
    },
    failure: {
      type: DELETE_SERVER_ROLE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});