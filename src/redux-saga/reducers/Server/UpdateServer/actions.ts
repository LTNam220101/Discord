import { UPDATE_SERVER_FAILED, UPDATE_SERVER_SUCCESS } from './reducers';
import { UPDATE_SERVER } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';

export const updateServer = (payload: any, componentId?: string) => ({
  type: UPDATE_SERVER,
  response: {
    success: {
      type: UPDATE_SERVER_SUCCESS,
    },
    failure: {
      type: UPDATE_SERVER_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});