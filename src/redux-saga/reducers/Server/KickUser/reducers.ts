import { createReducer } from "../../../../utils/redux";

export const KICK_USER_SUCCESS = 'KICK_USER_SUCCESS';
export const KICK_USER_FAILED = 'KICK_USER_FAILED';
export const KICK_USER_CLEAR = 'KICK_USER_CLEAR';

export const kickUserResult = createReducer(
  KICK_USER_SUCCESS,
  KICK_USER_FAILED,
  KICK_USER_CLEAR
);