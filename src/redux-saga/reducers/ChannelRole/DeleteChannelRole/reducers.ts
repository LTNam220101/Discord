import { createReducer } from "../../../../utils/redux";

export const DELETE_CHANNEL_ROLE_SUCCESS = 'DELETE_CHANNEL_ROLE_SUCCESS';
export const DELETE_CHANNEL_ROLE_FAILED = 'DELETE_CHANNEL_ROLE_FAILED';
export const DELETE_CHANNEL_ROLE_CLEAR = 'DELETE_CHANNEL_ROLE_CLEAR';

export const deleteChannelRoleResult = createReducer(
  DELETE_CHANNEL_ROLE_SUCCESS,
  DELETE_CHANNEL_ROLE_FAILED,
  DELETE_CHANNEL_ROLE_CLEAR
);