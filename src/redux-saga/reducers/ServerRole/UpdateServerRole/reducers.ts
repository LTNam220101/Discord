import { createReducer } from "../../../../utils/redux";

export const UPDATE_SERVER_ROLE_SUCCESS = 'UPDATE_SERVER_ROLE_SUCCESS';
export const UPDATE_SERVER_ROLE_FAILED = 'UPDATE_SERVER_ROLE_FAILED';
export const UPDATE_SERVER_ROLE_CLEAR = 'UPDATE_SERVER_ROLE_CLEAR';

export const updateServerRoleResult = createReducer(
  UPDATE_SERVER_ROLE_SUCCESS,
  UPDATE_SERVER_ROLE_FAILED,
  UPDATE_SERVER_ROLE_CLEAR
);