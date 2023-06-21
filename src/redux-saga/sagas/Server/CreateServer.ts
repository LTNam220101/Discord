import axios from '../BaseApi';
import { put, takeLatest, call } from "redux-saga/effects";
import { CREATESERVER, createServerFailure, createServerSuccess} from "./../../actions";
import { Request } from '../../../interfaces';
import instance from '../Base';
import initialState from './reducers';

const signupUrl = `/auth/sign-in`;

const createServer = async (payload: { name: string, description: string, isPublic: boolean, ownerId: string }) => {
    console.log(payload)
    const { data } = await instance.post(
        "/server",
        { ...payload },
    );
    console.log(data)
    return data;
};
function* doCreateServer(request: Request<{ name: string, description: string, isPublic: boolean, ownerId: string }>): any {
    try {
        if (request.payload) {

            const response = yield call(createServer, {
                description: request.payload.description as string,
                name: request.payload.name as string,
                isPublic: request.payload.isPublic as boolean,
                ownerId: request.payload.ownerId as string,
            });
            yield put(
                createServerSuccess({
                    description: response.description,
                    name: response.name,
                    isPublic: response.isPublic,
                    ownerId: response.ownerId,
                })
            );

            // localStorage.setItem('accessToken',response.accessToken);

        }
    } catch (e: any) {
        yield put(
            createServerFailure({
                error: e.message,
            })
        );
    }
}

export default function* watchCreateServer() {
    yield takeLatest(CREATESERVER, doCreateServer);
}
