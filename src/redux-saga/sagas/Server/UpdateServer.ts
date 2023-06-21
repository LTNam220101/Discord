import axios from '../BaseApi';
import { put, takeLatest, call } from "redux-saga/effects";
import { CREATESERVER, UPDATE_SERVER, createServerFailure, createServerSuccess, updateServerFailure, updateServerSuccess} from "./../../actions";
import { Request } from '../../../interfaces';
import instance from '../Base';

const signupUrl = `/auth/sign-in`;

const updateServer = async (payload: { name: string}) => {
    console.log(payload)
    const { data } = await instance.post(
        "/server/update",
        { ...payload },
    );
    console.log(payload)
    return data;

};
function* doUpdateServer(request: Request<{ name: string }>): any {
    try {
        if (request.payload) {

            const response = yield call(updateServer, {
                name: request.payload.name as string,
            });
            yield put(
                updateServerSuccess({
                    name: response.name,
                })
            );

            // localStorage.setItem('accessToken',response.accessToken);

        }
    } catch (e: any) {
        yield put(
            updateServerFailure({
                error: e.message,
            })
        );
    }
}

export default function* watchUpdateServer() {
    yield takeLatest(UPDATE_SERVER, doUpdateServer);
}
