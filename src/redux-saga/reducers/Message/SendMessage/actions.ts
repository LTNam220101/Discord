import { SEND_MESSAGE_FAILED, SEND_MESSAGE_SUCCESS } from './reducers';
import { SEND_MESSAGE } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';

export const sendMessage = (payload: any, componentId?: string) => ({
  type: SEND_MESSAGE,
  response: {
    success: {
      type: SEND_MESSAGE_SUCCESS,
    },
    failure: {
      type: SEND_MESSAGE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});