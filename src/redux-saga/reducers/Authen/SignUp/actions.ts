import { AUTH_REGISTER_FAILED, AUTH_REGISTER_SUCCESS } from './reducers';
import { AUTH_REGISTER } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';

export const signUp = (payload: RegisterForm, componentId?: string) => ({
  type: AUTH_REGISTER,
  response: {
    success: {
      type: AUTH_REGISTER_SUCCESS,
    },
    failure: {
      type: AUTH_REGISTER_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});