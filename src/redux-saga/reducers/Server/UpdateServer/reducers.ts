import { createReducer } from "../../../../utils/redux";

export const UPDATE_SERVER_SUCCESS = 'UPDATE_SERVER_SUCCESS';
export const UPDATE_SERVER_FAILED = 'UPDATE_SERVER_FAILED';
export const UPDATE_SERVER_CLEAR = 'UPDATE_SERVER_CLEAR';

export const updateServerResult = createReducer(
  UPDATE_SERVER_SUCCESS,
  UPDATE_SERVER_FAILED,
  UPDATE_SERVER_CLEAR
);