import { GET_ALL_MESSAGE_FAILED, GET_ALL_MESSAGE_SUCCESS } from './reducers';
import { GET_ALL_MESSAGE } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';

export const getAllMessage = (payload: any, componentId?: string) => ({
  type: GET_ALL_MESSAGE,
  response: {
    success: {
      type: GET_ALL_MESSAGE_SUCCESS,
    },
    failure: {
      type: GET_ALL_MESSAGE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});