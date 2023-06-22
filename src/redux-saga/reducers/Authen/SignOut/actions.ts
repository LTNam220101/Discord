import { LOGOUT_FAILED, LOGOUT_SUCCESS } from './reducers';
import { AUTH_LOGOUT } from '../../../actions';

export const logout = (payload?:any, componentId?: string) => ({
  type: AUTH_LOGOUT,
  response: {
    success: {
      type: LOGOUT_SUCCESS,
    },
    failure: {
      type: LOGOUT_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});