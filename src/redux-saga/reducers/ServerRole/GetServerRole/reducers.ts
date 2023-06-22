import { createReducer } from "../../../../utils/redux";

export const GET_SERVER_ROLE_SUCCESS = 'GET_SERVER_ROLE_SUCCESS';
export const GET_SERVER_ROLE_FAILED = 'GET_SERVER_ROLE_FAILED';
export const GET_SERVER_ROLE_CLEAR = 'GET_SERVER_ROLE_CLEAR';

export const getServerRoleResult = createReducer(
  GET_SERVER_ROLE_SUCCESS,
  GET_SERVER_ROLE_FAILED,
  GET_SERVER_ROLE_CLEAR
);