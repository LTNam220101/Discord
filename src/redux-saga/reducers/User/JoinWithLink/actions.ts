import { JOIN_WITH_LINK_FAILED, JOIN_WITH_LINK_SUCCESS } from './reducers';
import { JOIN_WITH_LINK } from '../../../actions';

export const joinWithLink = (payload: any, componentId?: string) => ({
  type: JOIN_WITH_LINK,
  response: {
    success: {
      type: JOIN_WITH_LINK_SUCCESS,
    },
    failure: {
      type: JOIN_WITH_LINK_FAILED,
    },
  },
  payload,
  componentId,
  loading: true,
});