import { CREATE_SERVER_FAILED, CREATE_SERVER_SUCCESS } from './reducers';
import { CREATE_SERVER } from '../../../actions';
import { RegisterForm } from '../../../../screens/Register/interfaces';

export const createServer = (payload: any, componentId?: string) => ({
  type: CREATE_SERVER,
  response: {
    success: {
      type: CREATE_SERVER_SUCCESS,
    },
    failure: {
      type: CREATE_SERVER_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});