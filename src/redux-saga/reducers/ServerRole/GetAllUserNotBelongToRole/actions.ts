import { GET_ALL_USER_NOT_BELONG_TO_ROLE_FAILED, GET_ALL_USER_NOT_BELONG_TO_ROLE_SUCCESS } from './reducers';
import { GET_ALL_USER_NOT_BELONG_TO_ROLE } from '../../../actions';

export const getAllUserNotBelongToRole = (payload: any, componentId?: string) => ({
  type: GET_ALL_USER_NOT_BELONG_TO_ROLE,
  response: {
    success: {
      type: GET_ALL_USER_NOT_BELONG_TO_ROLE_SUCCESS,
    },
    failure: {
      type: GET_ALL_USER_NOT_BELONG_TO_ROLE_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});