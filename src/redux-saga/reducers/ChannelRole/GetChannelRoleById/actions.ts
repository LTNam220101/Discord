import { GET_CHANNEL_ROLE_INFO_FAILED, GET_CHANNEL_ROLE_INFO_SUCCESS } from './reducers';
import { GET_CHANNEL_ROLE_INFO } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';

export const getChannelRoleInfo = (payload: any, componentId?: string) => ({
  type: GET_CHANNEL_ROLE_INFO,
  response: {
    success: {
      type: GET_CHANNEL_ROLE_INFO_SUCCESS,
    },
    failure: {
      type: GET_CHANNEL_ROLE_INFO_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});