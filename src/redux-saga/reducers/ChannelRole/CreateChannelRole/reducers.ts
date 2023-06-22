import { createReducer } from "../../../../utils/redux";

export const CREATE_CHANNEL_ROLE_SUCCESS = 'CREATE_CHANNEL_ROLE_SUCCESS';
export const CREATE_CHANNEL_ROLE_FAILED = 'CREATE_CHANNEL_ROLE_FAILED';
export const CREATE_CHANNEL_ROLE_CLEAR = 'CREATE_CHANNEL_ROLE_CLEAR';

export const createChannelRoleResult = createReducer(
  CREATE_CHANNEL_ROLE_SUCCESS,
  CREATE_CHANNEL_ROLE_FAILED,
  CREATE_CHANNEL_ROLE_CLEAR
);