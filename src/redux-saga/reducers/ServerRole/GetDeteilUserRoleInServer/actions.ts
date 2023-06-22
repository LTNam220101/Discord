import { GET_DETAIL_USER_ROLE_IN_SERVER_FAILED, GET_DETAIL_USER_ROLE_IN_SERVER_SUCCESS } from './reducers';
import { GET_DETAIL_USER_ROLE_IN_SERVER } from '../../../actions';

export const getDetailUserRoleInServer = (payload: any, componentId?: string) => ({
  type: GET_DETAIL_USER_ROLE_IN_SERVER,
  response: {
    success: {
      type: GET_DETAIL_USER_ROLE_IN_SERVER_SUCCESS,
    },
    failure: {
      type: GET_DETAIL_USER_ROLE_IN_SERVER_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});