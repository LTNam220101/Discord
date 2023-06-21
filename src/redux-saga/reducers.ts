
import { combineReducers } from "@reduxjs/toolkit"
import { loginReducer, logoutReducer, registerReducer } from './sagas/Authentication/reducers';
import { addUserToServerRoleReducer, createServerReducer,deleteServerReducer,getServerInfoReducer,listJoinServerReducer, updateServerReducer } from './sagas/Server/reducers';


const rootReducer = combineReducers({
  register: registerReducer,
  login:loginReducer,
  logout:logoutReducer,
  createServer:createServerReducer,
  listServer:listJoinServerReducer,
  updateServer:updateServerReducer,
  getServerInfo:getServerInfoReducer,
  deleteServer:deleteServerReducer,
  addUserToServerRole:addUserToServerRoleReducer,
})

export type State = ReturnType<typeof rootReducer>

export default rootReducer
