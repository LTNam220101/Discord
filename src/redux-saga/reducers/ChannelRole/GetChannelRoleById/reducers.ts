import { createReducer } from "../../../../utils/redux";

export const GET_CHANNEL_ROLE_INFO_SUCCESS = 'GET_CHANNEL_ROLE_INFO_SUCCESS';
export const GET_CHANNEL_ROLE_INFO_FAILED = 'GET_CHANNEL_ROLE_INFO_FAILED';
export const GET_CHANNEL_ROLE_INFO_CLEAR = 'GET_CHANNEL_ROLE_INFO_CLEAR';

export const getChannelRoleInfoResult = createReducer(
  GET_CHANNEL_ROLE_INFO_SUCCESS,
  GET_CHANNEL_ROLE_INFO_FAILED,
  GET_CHANNEL_ROLE_INFO_CLEAR
);