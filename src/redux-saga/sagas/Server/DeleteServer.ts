import axios from '../BaseApi';
import { put, takeLatest, call } from "redux-saga/effects";
import { CREATESERVER, DELETE_SERVER, UPDATE_SERVER, createServerFailure, createServerSuccess, deleteServerFailure, deleteServerSuccess, updateServerFailure, updateServerSuccess } from "./../../actions";
import { Request } from '../../../interfaces';
import instance from '../Base';

const signupUrl = `/auth/sign-in`;

const deleteServer = async (payload: { serverId: string, listJoinedServer: any[] }) => {
    console.log(payload)
    const { data } = await instance.delete(
        "/server/delete",
    );
    console.log(data)
    return data;

};
function* doDeleteServer(request: Request<{
    listJoinedServer: any[]; serverId: string
}>): any {
    try {
        if (request.payload) {
            const serverIdDelete = request.payload.serverId as string;
            const listJoinedServer = request.payload.listJoinedServer as any[];
            const response = yield call(deleteServer, {
                serverId: serverIdDelete,
                listJoinedServer: listJoinedServer,
            });
            yield put(
                deleteServerSuccess({
                    serverIdDelete: serverIdDelete,
                    listJoinedServer: response.listJoinedServer,
                })
            );

            // localStorage.setItem('accessToken',response.accessToken);

        }
    } catch (e: any) {
        yield put(
            deleteServerFailure({
                error: e.message,
            })
        );
    }
}

export default function* watchDeleteServer() {
    yield takeLatest(DELETE_SERVER, doDeleteServer);
}
