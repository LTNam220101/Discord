import { createReducer } from "../../../../utils/redux";

export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAILED = 'AUTH_REGISTER_FAILED';
export const AUTH_REGISTER_CLEAR = 'AUTH_REGISTER_CLEAR';

export const registerResult = createReducer(
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILED,
  AUTH_REGISTER_CLEAR
);