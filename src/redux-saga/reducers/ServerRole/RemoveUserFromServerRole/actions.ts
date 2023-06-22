import { REMOVE_USER_FROM_SERVER_ROLE_FAILED, REMOVE_USER_FROM_SERVER_ROLE_SUCCESS } from './reducers';
import { REMOVE_USER_FROM_SERVER_ROLE } from '../../../actions';

export const removeUserFromServerRole = (payload: any, componentId?: string) => ({
  type: REMOVE_USER_FROM_SERVER_ROLE,
  response: {
    success: {
      type: REMOVE_USER_FROM_SERVER_ROLE_SUCCESS,
    },
    failure: {
      type: REMOVE_USER_FROM_SERVER_ROLE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});