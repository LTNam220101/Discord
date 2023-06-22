import { UPDATE_CHANNEL_ROLE_FAILED, UPDATE_CHANNEL_ROLE_SUCCESS } from './reducers';
import { UPDATE_CHANNEL_ROLE } from '../../../actions';

export const updateChannelRole = (payload: any, componentId?: string) => ({
  type: UPDATE_CHANNEL_ROLE,
  response: {
    success: {
      type: UPDATE_CHANNEL_ROLE_SUCCESS,
    },
    failure: {
      type: UPDATE_CHANNEL_ROLE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});