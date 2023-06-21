import axios from '../BaseApi';
import { put, takeLatest, call } from "redux-saga/effects";
import { ADD_USER_TO_SERVER_ROLE, CREATESERVER, addUserToServerFailure, addUserToServerRoleSuccess, createServerFailure, createServerSuccess} from "./../../actions";
import { Request } from '../../../interfaces';
import instance from '../Base';
import initialState from './reducers';

const signupUrl = `/auth/sign-in`;

const addUserToServerRole = async (payload: { userId: string,serverId:string,RoleId:string}) => {
    console.log(payload)
    const { data } = await instance.put(
        `/server/${payload.serverId}/user-role/${payload.RoleId}`,
        {userId:payload.userId}
    );
    console.log(data)
    return data;
};
function* doAddUserToServerRole(request: Request<{userId: string,serverId:string,RoleId:string}>): any {
    try {
        if (request.payload) {

            const response = yield call(addUserToServerRole, {
                userId: request.payload.userId as string,
                serverId: request.payload.serverId as string,
                RoleId: request.payload.RoleId as string,
            });
            yield put(
                addUserToServerRoleSuccess({
                    userId: response.userId,
                    serverId: response. serverId,
                    RoleId: response.RoleId,
                })
            );

            // localStorage.setItem('accessToken',response.accessToken);

        }
    } catch (e: any) {
        yield put(
            addUserToServerFailure({
                error: e.message,
            })
        );
    }
}

export default function* watchAddUserToServerRole() {
    yield takeLatest(ADD_USER_TO_SERVER_ROLE, doAddUserToServerRole);
}
