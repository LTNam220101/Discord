import axios from "../BaseApi";
import { put, takeLatest, call } from "redux-saga/effects";
import { Request } from "../../../interfaces";
import { AUTH_LOGOUT, logoutFailure, logoutSuccess } from "../../actions";
import instance from "../BaseApi";
import logoutInstance, { logout } from "../Base";


function* doLogout(): any {
    try {
            const response = yield call(logout);
            localStorage.removeItem('userInfo');
            yield put(
                logoutSuccess({
                   response
                })
            );

    } catch (e: any) {
        yield put(
            logoutFailure({
                error: e.message,
            })
        );
    }
}


export default function* watchLogout() {
    yield takeLatest(AUTH_LOGOUT, doLogout);
}
