import { KICK_USER_FAILED, KICK_USER_SUCCESS } from './reducers';
import { KICK_USER } from '../../../actions';

export const kickUser = (payload: any, componentId?: string) => ({
  type: KICK_USER,
  response: {
    success: {
      type: KICK_USER_SUCCESS,
    },
    failure: {
      type: KICK_USER_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});