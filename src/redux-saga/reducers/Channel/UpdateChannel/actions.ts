import { UPDATE_CHANNEL_FAILED, UPDATE_CHANNEL_SUCCESS } from './reducers';
import { UPDATE_CHANNEL } from '../../../actions';

export const updateChannel = (payload: any, componentId?: string) => ({
  type: UPDATE_CHANNEL,
  response: {
    success: {
      type: UPDATE_CHANNEL_SUCCESS,
    },
    failure: {
      type: UPDATE_CHANNEL_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});