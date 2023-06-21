import { all } from "redux-saga/effects"
import { login, register,logout } from "./sagas/Authentication"
import { createServer,getServerInfo,listJoinServer,updateServer,deleteServer, addUserToServerRole } from "./sagas/Server"

export default function* rootSaga() {
  yield all([ register(),login(),logout(),createServer(),listJoinServer(),updateServer(),getServerInfo(),deleteServer(),addUserToServerRole()])
}
