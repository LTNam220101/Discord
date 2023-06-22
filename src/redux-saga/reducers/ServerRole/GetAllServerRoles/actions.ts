import { GET_ALL_SERVER_ROLES_FAILED, GET_ALL_SERVER_ROLES_SUCCESS } from './reducers';
import { GET_ALL_SERVER_ROLES } from '../../../actions';

export const getAllServerRoles = (payload: any, componentId?: string) => ({
  type: GET_ALL_SERVER_ROLES,
  response: {
    success: {
      type: GET_ALL_SERVER_ROLES_SUCCESS,
    },
    failure: {
      type: GET_ALL_SERVER_ROLES_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});