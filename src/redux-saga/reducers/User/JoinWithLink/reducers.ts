import { createReducer } from "../../../../utils/redux";

export const JOIN_WITH_LINK_SUCCESS = 'JOIN_WITH_LINK_SUCCESS';
export const JOIN_WITH_LINK_FAILED = 'JOIN_WITH_LINK_FAILED';
export const JOIN_WITH_LINK_CLEAR = 'JOIN_WITH_LINK_CLEAR';

export const joinWithLinkResult = createReducer(
  JOIN_WITH_LINK_SUCCESS,
  JOIN_WITH_LINK_FAILED,
  JOIN_WITH_LINK_CLEAR
);