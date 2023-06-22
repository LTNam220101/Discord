import { createReducer } from "../../../../utils/redux";

export const ADD_USER_TO_SERVER_ROLE_SUCCESS = 'ADD_USER_TO_SERVER_ROLE_SUCCESS';
export const ADD_USER_TO_SERVER_ROLE_FAILED = 'ADD_USER_TO_SERVER_ROLE_FAILED';
export const ADD_USER_TO_SERVER_ROLE_CLEAR = 'ADD_USER_TO_SERVER_ROLE_CLEAR';

export const addUserToServerRoleResult = createReducer(
  ADD_USER_TO_SERVER_ROLE_SUCCESS,
  ADD_USER_TO_SERVER_ROLE_FAILED,
  ADD_USER_TO_SERVER_ROLE_CLEAR
);