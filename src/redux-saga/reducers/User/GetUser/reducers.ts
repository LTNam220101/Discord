import { createReducer } from "../../../../utils/redux";

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_CLEAR = 'GET_USER_CLEAR';

export const getUserResult = createReducer(
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_CLEAR
);