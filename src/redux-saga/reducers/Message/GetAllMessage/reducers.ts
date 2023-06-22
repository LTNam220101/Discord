import { createReducer } from "../../../../utils/redux";

export const GET_ALL_MESSAGE_SUCCESS = 'GET_ALL_MESSAGE_SUCCESS';
export const GET_ALL_MESSAGE_FAILED = 'GET_ALL_MESSAGE_FAILED';
export const GET_ALL_MESSAGE_CLEAR = 'GET_ALL_MESSAGE_CLEAR';

export const getAllMessageResult = createReducer(
  GET_ALL_MESSAGE_SUCCESS,
  GET_ALL_MESSAGE_FAILED,
  GET_ALL_MESSAGE_CLEAR
);