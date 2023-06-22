import { createReducer } from "../../../../utils/redux";

export const CREATE_CHANNEL_SUCCESS = 'CREATE_CHANNEL_SUCCESS';
export const CREATE_CHANNEL_FAILED = 'CREATE_CHANNEL_FAILED';
export const CREATE_CHANNEL_CLEAR = 'CREATE_CHANNEL_CLEAR';

export const createChannelResult = createReducer(
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_FAILED,
  CREATE_CHANNEL_CLEAR
);