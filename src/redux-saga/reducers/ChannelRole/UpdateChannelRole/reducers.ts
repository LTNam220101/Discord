import { createReducer } from "../../../../utils/redux";

export const UPDATE_CHANNEL_ROLE_SUCCESS = 'UPDATE_CHANNEL_ROLE_SUCCESS';
export const UPDATE_CHANNEL_ROLE_FAILED = 'UPDATE_CHANNEL_ROLE_FAILED';
export const UPDATE_CHANNEL_ROLE_CLEAR = 'UPDATE_CHANNEL_ROLE_CLEAR';

export const updateChannelRoleResult = createReducer(
  UPDATE_CHANNEL_ROLE_SUCCESS,
  UPDATE_CHANNEL_ROLE_FAILED,
  UPDATE_CHANNEL_ROLE_CLEAR
);