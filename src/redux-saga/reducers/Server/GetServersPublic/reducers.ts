import { createReducer } from "../../../../utils/redux";

export const GET_SERVERS_PUBLIC_SUCCESS = 'GET_SERVERS_PUBLIC_SUCCESS';
export const GET_SERVERS_PUBLIC_FAILED = 'GET_SERVERS_PUBLIC_FAILED';
export const GET_SERVERS_PUBLIC_CLEAR = 'GET_SERVERS_PUBLIC_CLEAR';

export const getServersPublicResult = createReducer(
  GET_SERVERS_PUBLIC_SUCCESS,
  GET_SERVERS_PUBLIC_FAILED,
  GET_SERVERS_PUBLIC_CLEAR
);