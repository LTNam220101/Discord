import { createReducer } from "../../../../utils/redux";

export const CREATE_SERVER_SUCCESS = 'CREATE_SERVER_SUCCESS';
export const CREATE_SERVER_FAILED = 'CREATE_SERVER_FAILED';
export const CREATE_SERVER_CLEAR = 'CREATE_SERVER_CLEAR';

export const createServerResult = createReducer(
  CREATE_SERVER_SUCCESS,
  CREATE_SERVER_FAILED,
  CREATE_SERVER_CLEAR
);