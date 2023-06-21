
export const AUTH_LOGIN = "AUTH_LOGIN"
export const AUTH_REGISTER = "AUTH_REGISTER"
export const AUTH_LOGOUT = "AUTH_LOGOUT"
export const SIGNUP_FAILURE = "SIGNUP_FAILURE"
export const SIGNUP_SUCCESS = "AUTH_SUCCESS"
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS"
export const SIGNIN_FAILURE = "SIGNIN_FAILURE"
export const LOGOUT_FAILURE = "LOGOUT_FAILURE"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const CREATESERVER = "CREATESERVER"
export const CREATESERVER_SUCCESS = "CREATESERVER_SUCCESS"
export const CREATESERVER_FAILURE = "CREATESERVER_FAILURE"
export const LISTJOINSERVER = "LISTJOINSERVER"
export const LISTJOINSERVER_SUCCESS = "LISTJOINSERVER_SUCCESS"
export const LISTJOINSERVER_FAILURE = "LISTJOINSERVER_FAILURE"
export const UPDATE_SERVER = "UPDATE_SERVER"
export const UPDATESERVER_SUCCESS = "UPDATESERVER_SUCCESS"      
export const UPDATESERVER_FAILURE = "UPDATESERVER_FAILURE"
export const DELETE_SERVER = "DELETE_SERVER"
export const DELETESERVER_SUCCESS = "DELETESERVER_SUCCESS"      
export const DELETESERVER_FAILURE = "DELETESERVER_FAILURE"
export const GET_SERVER_INFO = "GET_SERVER_INFO "
export const GETSERVERINFO_SUCCESS = "GETSERVERINFO_SUCCESS"      
export const GETSERVERINFO_FAILURE = "GETSERVERINFO_SUCCESS"
export const ADD_USER_TO_SERVER_ROLE = "ADD_USER_TO_SERVER_ROLE"
export const ADD_USER_TO_SERVER_ROLE_SUCCESS = "ADD_USER_TO_SERVER_ROLE_SUCCESS"      
export const ADD_USER_TO_SERVER_ROLE_FAILURE = "ADD_USER_TO_SERVER_ROLE_FAILURE"
// template: ACTION_TEMP = "ACTION_TEMP
export const signupSuccess = (payload: Record<string, unknown>) => ({
    type: SIGNUP_SUCCESS,
    payload
})
export const signupFailure = (payload: Record<string, unknown>) => ({
    type: SIGNUP_FAILURE,
    payload
})
export const signinSuccess = (payload: Record<string, unknown>) => ({
    type: SIGNIN_SUCCESS,
    payload
})
export const signinFailure = (payload: Record<string, unknown>) => ({
    type: SIGNIN_FAILURE,
    payload
})
export const logoutSuccess = (payload: Record<string, unknown>) => ({
    type: LOGOUT_SUCCESS,
    payload
})
export const logoutFailure = (payload: Record<string, unknown>) => ({
    type: LOGOUT_FAILURE,
    payload
})
export const createServerSuccess = (payload: Record<string, unknown>) => ({
    type: CREATESERVER_SUCCESS,
    payload
})
export const createServerFailure = (payload: Record<string, unknown>) => ({
    type: CREATESERVER_FAILURE,
    payload
})
export const listJoinedServerSuccess = (payload: Record<string, unknown>) => ({
    type: CREATESERVER_SUCCESS,
    payload
})
export const listJoinedServerFailure = (payload: Record<string, unknown>) => ({
    type: CREATESERVER_FAILURE,
    payload
})
export const updateServerSuccess = (payload: Record<string, unknown>) => ({
    type: UPDATESERVER_SUCCESS,
    payload
})
export const updateServerFailure = (payload: Record<string, unknown>) => ({
    type: UPDATESERVER_FAILURE,
    payload
})
export const getServerInfoSuccess = (payload: Record<string, unknown>) => ({
    type: GETSERVERINFO_SUCCESS,
    payload
})
export const getServerInfoFailure = (payload: Record<string, unknown>) => ({
    type: GETSERVERINFO_FAILURE,
    payload
})
export const deleteServerSuccess = (payload: Record<string, unknown>) => ({
    type: DELETESERVER_SUCCESS,
    payload
})
export const deleteServerFailure = (payload: Record<string, unknown>) => ({
    type: DELETESERVER_FAILURE,
    payload
})
export const addUserToServerRoleSuccess = (payload: Record<string, unknown>) => ({
    type: ADD_USER_TO_SERVER_ROLE_SUCCESS,
    payload
})
export const addUserToServerFailure = (payload: Record<string, unknown>) => ({
    type: ADD_USER_TO_SERVER_ROLE_FAILURE,
    payload
})