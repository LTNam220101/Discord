import { GET_USER_FAILED, GET_USER_SUCCESS } from './reducers';
import { GET_USER } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';

export const getUser = (payload: any, componentId?: string) => ({
  type: GET_USER,
  response: {
    success: {
      type: GET_USER_SUCCESS,
    },
    failure: {
      type: GET_USER_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});