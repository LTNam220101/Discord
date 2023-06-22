import { CREATE_INVITE_FAILED, CREATE_INVITE_SUCCESS } from './reducers';
import { CREATE_INVITE } from '../../../actions';

export const createInvite = (payload: any, componentId?: string) => ({
  type: CREATE_INVITE,
  response: {
    success: {
      type: CREATE_INVITE_SUCCESS,
    },
    failure: {
      type: CREATE_INVITE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});