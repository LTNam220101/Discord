import { GET_CHANNEL_INFO_FAILED, GET_CHANNEL_INFO_SUCCESS } from './reducers';
import { GET_CHANNEL_INFO } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';

export const getChannelInfo = (payload: any, componentId?: string) => ({
  type: GET_CHANNEL_INFO,
  response: {
    success: {
      type: GET_CHANNEL_INFO_SUCCESS,
    },
    failure: {
      type: GET_CHANNEL_INFO_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});