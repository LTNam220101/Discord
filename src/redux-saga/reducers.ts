import { combineReducers } from "@reduxjs/toolkit"
import { LoginResult } from "../screens/Login/reducers"
import { registerResult } from "../screens/Register/reducers"
import { LogoutResult } from "../screens/UserSetting/reducers"

const rootReducer = combineReducers({
  registerResult: registerResult,
  loginResult: LoginResult,
  logoutResult: LogoutResult,
})

export type State = ReturnType<typeof rootReducer>

export default rootReducer
