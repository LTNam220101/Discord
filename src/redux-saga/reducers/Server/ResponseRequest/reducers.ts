import { createReducer } from "../../../../utils/redux";

export const RESPONSE_REQUEST_SUCCESS = 'RESPONSE_REQUEST_SUCCESS';
export const RESPONSE_REQUEST_FAILED = 'RESPONSE_REQUEST_FAILED';
export const RESPONSE_REQUEST_CLEAR = 'RESPONSE_REQUEST_CLEAR';

export const responseRequestResult = createReducer(
  RESPONSE_REQUEST_SUCCESS,
  RESPONSE_REQUEST_FAILED,
  RESPONSE_REQUEST_CLEAR
);