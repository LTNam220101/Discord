
import { GET_SERVER_INFO, UPDATE_SERVER } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';
import { GET_SERVER_INFO_FAILED, GET_SERVER_INFO_SUCCESS } from './reducers';

export const getServerInfo = (payload: {serverId:any}, componentId?: string) => ({
  type: GET_SERVER_INFO,
  response: {
    success: {
      type: GET_SERVER_INFO_SUCCESS,
    },
    failure: {
      type: GET_SERVER_INFO_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});