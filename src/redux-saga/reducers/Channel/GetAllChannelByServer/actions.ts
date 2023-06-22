import { GET_ALL_CHANNEL_BY_SERVER_FAILED, GET_ALL_CHANNEL_BY_SERVER_SUCCESS } from './reducers';
import { GET_ALL_CHANNEL_BY_SERVER } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';

export const getAllChannelByServer = (payload: any, componentId?: string) => ({
  type: GET_ALL_CHANNEL_BY_SERVER,
  response: {
    success: {
      type: GET_ALL_CHANNEL_BY_SERVER_SUCCESS,
    },
    failure: {
      type: GET_ALL_CHANNEL_BY_SERVER_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});