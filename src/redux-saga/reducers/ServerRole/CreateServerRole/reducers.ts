import { createReducer } from "../../../../utils/redux";

export const CREATE_SERVER_ROLE_SUCCESS = 'CREATE_SERVER_ROLE_SUCCESS';
export const CREATE_SERVER_ROLE_FAILED = 'CREATE_SERVER_ROLE_FAILED';
export const CREATE_SERVER_ROLE_CLEAR = 'CREATE_SERVER_ROLE_CLEAR';

export const createServerRoleResult = createReducer(
  CREATE_SERVER_ROLE_SUCCESS,
  CREATE_SERVER_ROLE_FAILED,
  CREATE_SERVER_ROLE_CLEAR
);