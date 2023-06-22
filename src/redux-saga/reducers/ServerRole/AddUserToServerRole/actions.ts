import { ADD_USER_TO_SERVER_ROLE_FAILED, ADD_USER_TO_SERVER_ROLE_SUCCESS } from './reducers';
import { ADD_USER_TO_SERVER_ROLE } from '../../../actions';

export const addUserToServerRole = (payload: any, componentId?: string) => ({
  type: ADD_USER_TO_SERVER_ROLE,
  response: {
    success: {
      type: ADD_USER_TO_SERVER_ROLE_SUCCESS,
    },
    failure: {
      type: ADD_USER_TO_SERVER_ROLE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});