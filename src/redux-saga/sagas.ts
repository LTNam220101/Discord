import { all } from "redux-saga/effects"
import { login, register, logout } from "./sagas/Authentication"
import watchCreateChannel from "./sagas/Channel/CreateChannel"
import watchDeleteChannel from "./sagas/Channel/DeleteChannel"
import watchGetAllChannelByServer from "./sagas/Channel/GetAllChannelByServer"
import watchGetChannelInfo from "./sagas/Channel/GetChannelInfo"
import watchUpdateChannel from "./sagas/Channel/UpdateChannel"
import watchCreateChannelRole from "./sagas/ChannelRole/CreateChannelRole"
import watchDeleteChannelRole from "./sagas/ChannelRole/DeleteChannelRole"
import watchGetChannelRoleInfo from "./sagas/ChannelRole/GetChannelRoleInfo"
import watchUpdateChannelRole from "./sagas/ChannelRole/UpdateChannelRole"
import watchCreateInvite from "./sagas/Invite/CreateInvite"
import watchGetAllMessage from "./sagas/Message/GetAllMessage"
import watchSendMessage from "./sagas/Message/SendMessage"
import watchCreateServer from "./sagas/Server/CreateServer"
import watchDeleteServer from "./sagas/Server/DeleteServer"
import watchGetServerInfo from "./sagas/Server/GetServerInfo"
import watchGetServersPublicInfo from "./sagas/Server/GetServersPublic"
import watchGetListServerJoined from "./sagas/Server/ListJoinServer"
import watchResponseRequest from "./sagas/Server/ResponseRequest"
import watchUpdateServer from "./sagas/Server/UpdateServer"
import watchAddUserToServerRole from "./sagas/ServerRole/AddUserToServerRole"
import watchCreateServerRole from "./sagas/ServerRole/CreateServerRole"
import watchDeleteServerRole from "./sagas/ServerRole/DeleteServerRole"
import watchGetAllServerRole from "./sagas/ServerRole/GetAllServerRole"
import watchGetAllUserBelongToServerRole from "./sagas/ServerRole/GetAllUserBelongToServerRole"
import watchGetAllUserNotBelongToServerRole from "./sagas/ServerRole/GetAllUserNotBelongToServerRole"
import watchGetDetailUserRoleInServer from "./sagas/ServerRole/GetDetailUserRoleInServer"
import watchGetServerRole from "./sagas/ServerRole/GetServerRole"
import watchRemoveUserFromServerRole from "./sagas/ServerRole/RemoveUserFromServerRole"
import watchUpdateServerRole from "./sagas/ServerRole/UpdateServerRole"

export default function* rootSaga() {
  yield all([
    register(),
    login(),
    logout(),

    watchCreateChannel(),
    watchDeleteChannel(),
    watchGetAllChannelByServer(), 
    watchGetChannelInfo(), 
    watchUpdateChannel(),

    watchCreateChannelRole(),
    watchDeleteChannelRole(),
    watchGetChannelRoleInfo(),
    watchUpdateChannelRole(),

    watchCreateInvite(),

    watchGetAllMessage(),
    watchSendMessage(),


    watchCreateServer(),
    watchDeleteServer(),
    watchGetListServerJoined(),
    watchUpdateServer(),
    watchGetServerInfo(),
    watchGetServersPublicInfo(),
    watchResponseRequest(),

    watchAddUserToServerRole(),
    watchCreateServerRole(),
    watchDeleteServerRole(),
    watchGetAllServerRole(),
    watchGetAllUserBelongToServerRole(),
    watchGetAllUserNotBelongToServerRole(),
    watchGetDetailUserRoleInServer(),
    watchGetServerRole(),
    watchRemoveUserFromServerRole(),
    watchUpdateServerRole(),
  ])
}
