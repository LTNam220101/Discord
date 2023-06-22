import { createReducer } from "../../../../utils/redux";

export const DELETE_SERVER_ROLE_SUCCESS = 'DELETE_SERVER_ROLE_SUCCESS';
export const DELETE_SERVER_ROLE_FAILED = 'DELETE_SERVER_ROLE_FAILED';
export const DELETE_SERVER_ROLE_CLEAR = 'DELETE_SERVER_ROLE_CLEAR';

export const deleteServerRoleResult = createReducer(
  DELETE_SERVER_ROLE_SUCCESS,
  DELETE_SERVER_ROLE_FAILED,
  DELETE_SERVER_ROLE_CLEAR
);