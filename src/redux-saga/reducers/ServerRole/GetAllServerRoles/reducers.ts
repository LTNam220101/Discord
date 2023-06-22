import { createReducer } from "../../../../utils/redux";

export const GET_ALL_SERVER_ROLES_SUCCESS = 'GET_ALL_SERVER_ROLES_SUCCESS';
export const GET_ALL_SERVER_ROLES_FAILED = 'GET_ALL_SERVER_ROLES_FAILED';
export const GET_ALL_SERVER_ROLES_CLEAR = 'GET_ALL_SERVER_ROLES_CLEAR';

export const getAllServerRolesResult = createReducer(
  GET_ALL_SERVER_ROLES_SUCCESS,
  GET_ALL_SERVER_ROLES_FAILED,
  GET_ALL_SERVER_ROLES_CLEAR
);