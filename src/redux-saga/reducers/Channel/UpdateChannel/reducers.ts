import { createReducer } from "../../../../utils/redux";

export const UPDATE_CHANNEL_SUCCESS = 'UPDATE_CHANNEL_SUCCESS';
export const UPDATE_CHANNEL_FAILED = 'UPDATE_CHANNEL_FAILED';
export const UPDATE_CHANNEL_CLEAR = 'UPDATE_CHANNEL_CLEAR';

export const updateChannelResult = createReducer(
  UPDATE_CHANNEL_SUCCESS,
  UPDATE_CHANNEL_FAILED,
  UPDATE_CHANNEL_CLEAR
);