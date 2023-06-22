import { UPDATE_SERVER_ROLE_FAILED, UPDATE_SERVER_ROLE_SUCCESS } from './reducers';
import { UPDATE_SERVER_ROLE } from '../../../actions';

export const updateServerRole = (payload: any, componentId?: string) => ({
  type: UPDATE_SERVER_ROLE,
  response: {
    success: {
      type: UPDATE_SERVER_ROLE_SUCCESS,
    },
    failure: {
      type: UPDATE_SERVER_ROLE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});