import { createReducer } from "../../../../utils/redux";

export const CREATE_INVITE_SUCCESS = 'CREATE_INVITE_SUCCESS';
export const CREATE_INVITE_FAILED = 'CREATE_INVITE_FAILED';
export const CREATE_INVITE_CLEAR = 'CREATE_INVITE_CLEAR';

export const createInviteResult = createReducer(
  CREATE_INVITE_SUCCESS,
  CREATE_INVITE_FAILED,
  CREATE_INVITE_CLEAR
);