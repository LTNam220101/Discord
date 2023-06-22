import { CREATE_CHANNEL_ROLE_FAILED, CREATE_CHANNEL_ROLE_SUCCESS } from './reducers';
import { CREATE_CHANNEL_ROLE } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';

export const createChannelRole = (payload: any, componentId?: string) => ({
  type: CREATE_CHANNEL_ROLE,
  response: {
    success: {
      type: CREATE_CHANNEL_ROLE_SUCCESS,
    },
    failure: {
      type: CREATE_CHANNEL_ROLE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});