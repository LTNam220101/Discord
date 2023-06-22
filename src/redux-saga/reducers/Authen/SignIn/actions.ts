import { LOGIN_FAILED, LOGIN_SUCCESS } from './reducers';
import { AUTH_LOGIN } from '../../../actions';
import { LoginForm } from '../../../../screens/Login/interfaces';

export const login = (payload: LoginForm, componentId?: string) => ({
  type: AUTH_LOGIN,
  response: {
    success: {
      type: LOGIN_SUCCESS,
    },
    failure: {
      type: LOGIN_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});