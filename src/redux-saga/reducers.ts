import { combineReducers } from "@reduxjs/toolkit"
import { GetListServerJoinedResult } from "../components/ServersList/reducers"
import { LoginResult } from "./reducers/Authen/SignIn/reducers"
import { LogoutResult } from "./reducers/Authen/SignOut/reducers"
import { registerResult } from "./reducers/Authen/SignUp/reducers"
import { createChannelResult } from "./reducers/Channel/CreateChannel/reducers"
import { deleteChannelResult } from "./reducers/Channel/DeleteChannel/reducers"
import { getAllChannelByServerResult } from "./reducers/Channel/GetAllChannelByServer/reducers"
import { getChannelInfoResult } from "./reducers/Channel/GetChannelById/reducers"
import { updateChannelResult } from "./reducers/Channel/UpdateChannel/reducers"
import { createChannelRoleResult } from "./reducers/ChannelRole/CreateChannelRole/reducers"
import { deleteChannelRoleResult } from "./reducers/ChannelRole/DeleteChannelRole/reducers"
import { getChannelRoleInfoResult } from "./reducers/ChannelRole/GetChannelRoleById/reducers"
import { updateChannelRoleResult } from "./reducers/ChannelRole/UpdateChannelRole/reducers"
import { createInvite } from './reducers/Invite/CreateInvite/actions';
import { getAllMessageResult } from "./reducers/Message/GetAllMessage/reducers"
import { sendMessageResult } from "./reducers/Message/SendMessage/reducers"
import { createServerResult } from "./reducers/Server/CreateServer/reducers"
import { deleteServerResult } from "./reducers/Server/DeleteServer/reducers"
import { getListServerJoinedResult } from "./reducers/Server/GetListServerJoined/reducers"
import { getServerByIdResult } from "./reducers/Server/GetServerById/reducers"
import { getServersPublicResult } from "./reducers/Server/GetServersPublic/reducers"
import { kickUserResult } from "./reducers/Server/KickUser/reducers"
import { responseRequestResult } from "./reducers/Server/ResponseRequest/reducers"
import { updateServerResult } from "./reducers/Server/UpdateServer/reducers"
import { addUserToServerRoleResult } from "./reducers/ServerRole/AddUserToServerRole/reducers"
import { createServerRoleResult } from "./reducers/ServerRole/CreateServerRole/reducers"
import { deleteServerRoleResult } from "./reducers/ServerRole/DeleteServerRole/reducers"
import { getAllServerRolesResult } from "./reducers/ServerRole/GetAllServerRoles/reducers"
import { getAllUserBelongToRoleResult } from "./reducers/ServerRole/GetAllUserBelongToRole/reducers"
import { getAllUserNotBelongToRoleResult } from "./reducers/ServerRole/GetAllUserNotBelongToRole/reducers"
import { getDetailUserRoleInServerResult } from "./reducers/ServerRole/GetDeteilUserRoleInServer/reducers"
import { getServerRoleResult } from "./reducers/ServerRole/GetServerRole/reducers"
import { removeUserFromServerRoleResult } from "./reducers/ServerRole/RemoveUserFromServerRole/reducers"
import { updateServerRoleResult } from "./reducers/ServerRole/UpdateServerRole/reducers"
import { getUserResult } from "./reducers/User/GetUser/reducers"
import { joinWithLinkResult } from "./reducers/User/JoinWithLink/reducers"
import { requestToJoinServerResult } from "./reducers/User/RequestToJoinServer/reducers"

const rootReducer = combineReducers({
  registerResult: registerResult,
  loginResult: LoginResult,
  logoutResult: LogoutResult,

  createChannelResult: createChannelResult,
  deleteChannelResult: deleteChannelResult,
  getAllChannelByServerResult: getAllChannelByServerResult,
  getChannelInfoResult: getChannelInfoResult,
  updateChannelResult: updateChannelResult,

  createChannelRoleResult: createChannelRoleResult,
  deleteChannelRoleResult: deleteChannelRoleResult,
  getChannelRoleInfoResult: getChannelRoleInfoResult,
  updateChannelRoleResult: updateChannelRoleResult,

  createInvite: createInvite,

  getAllMessageResult: getAllMessageResult,
  sendMessageResult: sendMessageResult,

  createServerResult: createServerResult,
  deleteServerResult: deleteServerResult,
  getListServerJoinedResult: getListServerJoinedResult,
  getServerByIdResult: getServerByIdResult,
  getServersPublicResult: getServersPublicResult,
  kickUserResult: kickUserResult,
  responseRequestResult: responseRequestResult,
  updateServerResult: updateServerResult,
  
  addUserToServerRoleResult: addUserToServerRoleResult,
  createServerRoleResult: createServerRoleResult,
  deleteServerRoleResult: deleteServerRoleResult,
  getAllServerRolesResult: getAllServerRolesResult,
  getAllUserBelongToRoleResult: getAllUserBelongToRoleResult, 
  getAllUserNotBelongToRoleResult: getAllUserNotBelongToRoleResult,
  getDetailUserRoleInServerResult: getDetailUserRoleInServerResult,
  getServerRoleResult: getServerRoleResult,
  removeUserFromServerRoleResult: removeUserFromServerRoleResult,
  updateServerRoleResult: updateServerRoleResult,
  
  getUserResult: getUserResult,
  joinWithLinkResult: joinWithLinkResult,
  requestToJoinServerResult: requestToJoinServerResult
})

export type State = ReturnType<typeof rootReducer>

export default rootReducer
