import { createReducer } from "../../../../utils/redux";

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_CLEAR = 'LOGOUT_CLEAR';

export const LogoutResult = createReducer(
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_CLEAR
);