import { CREATE_SERVER_ROLE_FAILED, CREATE_SERVER_ROLE_SUCCESS } from './reducers';
import { CREATE_SERVER_ROLE } from '../../../actions';

export const createServerRole = (payload: any, componentId?: string) => ({
  type: CREATE_SERVER_ROLE,
  response: {
    success: {
      type: CREATE_SERVER_ROLE_SUCCESS,
    },
    failure: {
      type: CREATE_SERVER_ROLE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});