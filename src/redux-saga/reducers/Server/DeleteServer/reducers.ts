import { createReducer } from "../../../../utils/redux";

export const DELETE_SERVER_SUCCESS = 'DELETE_SERVER_SUCCESS';
export const DELETE_SERVER_FAILED = 'DELETE_SERVER_FAILED';
export const DELETE_SERVER_CLEAR = 'DELETE_SERVER_CLEAR';

export const deleteServerResult = createReducer(
  DELETE_SERVER_SUCCESS,
  DELETE_SERVER_FAILED,
  DELETE_SERVER_CLEAR
);