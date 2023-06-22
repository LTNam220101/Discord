import { createReducer } from "../../../../utils/redux";

export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';
export const SEND_MESSAGE_CLEAR = 'SEND_MESSAGE_CLEAR';

export const sendMessageResult = createReducer(
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILED,
  SEND_MESSAGE_CLEAR
);