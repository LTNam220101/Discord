import { createReducer } from "../../../../utils/redux";

export const DELETE_CHANNEL_SUCCESS = 'DELETE_CHANNEL_SUCCESS';
export const DELETE_CHANNEL_FAILED = 'DELETE_CHANNEL_FAILED';
export const DELETE_CHANNEL_CLEAR = 'DELETE_CHANNEL_CLEAR';

export const deleteChannelResult = createReducer(
  DELETE_CHANNEL_SUCCESS,
  DELETE_CHANNEL_FAILED,
  DELETE_CHANNEL_CLEAR
);