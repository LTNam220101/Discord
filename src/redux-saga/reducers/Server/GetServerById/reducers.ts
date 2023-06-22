import { createReducer } from "../../../../utils/redux";

export const GET_SERVER_INFO_SUCCESS = 'GET_SERVER_INFO_SUCCESS';
export const GET_SERVER_INFO_FAILED = 'GET_SERVER_INFO_FAILED';
export const GET_SERVER_INFO_CLEAR = 'GET_SERVER_INFO_CLEAR';

export const getServerByIdResult = createReducer(
  GET_SERVER_INFO_SUCCESS,
  GET_SERVER_INFO_FAILED,
  GET_SERVER_INFO_CLEAR
);