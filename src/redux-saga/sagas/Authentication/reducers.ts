

import { createSelector } from '@reduxjs/toolkit';
import { Request } from '../../../interfaces';
import { State } from '../../reducers';
import { AuthState } from '../../type';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, CREATESERVER, CREATESERVER_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS, SIGNIN_FAILURE, SIGNIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_SUCCESS } from './../../actions';

const userInfoString = localStorage.getItem('userInfo');
const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

const initialState: AuthState = {
    signIn: {
        userInfo: userInfo
    }
};

export function registerReducer(state = initialState, request: Request<Record<string, unknown>>) {
    switch (request.type) {
        case AUTH_REGISTER:
            return {
                ...state,
            }
        case SIGNUP_FAILURE:
            if (request.payload) {
                return {
                    ...state,
                    username: "",
                    email: "",
                    error: request.payload.error,
                };
            }
            return state;
        case SIGNUP_SUCCESS:
            if (request.payload) {
                return {
                    ...state,
                    userInfo: request.payload,
                    error: null,
                };
            }
            return state;
        default:
            return {
                ...state,
            };
    }
}
export function loginReducer(state = initialState, request: Request<Record<string, unknown>>) {
    switch (request.type) {
        case AUTH_LOGIN:
            return {
                ...state,
            }
        case SIGNIN_FAILURE:
            if (request.payload) {
                return {
                    ...state,
                    userInfo: "",
                    error: request.payload.error,
                };
            }
            return state;
        case SIGNIN_SUCCESS:
            if (request.payload) {
                return {
                    ...state,
                    userInfo: request.payload,
                    error: null,
                };
            }
            return state;
        default:
            return {
                ...state,
            };
    }
}
export function logoutReducer(state = initialState, request: Request<Record<string, unknown>>) {
    switch (request.type) {
        case AUTH_LOGOUT:
            return {
                ...state,
            }
        case LOGOUT_FAILURE:
            if (request.payload) {
                return {
                    error: request.payload.error,
                };
            }
            return state;
        case LOGOUT_SUCCESS:
            if (request.payload) {
                return {
                    userInfo: "hi userInfo",
                    error: null,
                };
            }
            return state;
        default:
            return {
                ...state,
            };
    }
}
// Lưu initialState vào localStorage

