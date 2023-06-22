import { CREATE_CHANNEL_FAILED, CREATE_CHANNEL_SUCCESS } from './reducers';
import { CREATE_CHANNEL } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';

export const createChannel = (payload: any, componentId?: string) => ({
  type: CREATE_CHANNEL,
  response: {
    success: {
      type: CREATE_CHANNEL_SUCCESS,
    },
    failure: {
      type: CREATE_CHANNEL_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});