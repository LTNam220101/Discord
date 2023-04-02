import { combineReducers } from "@reduxjs/toolkit"
// import { GetNotiResult } from "components/Notification/reducers"

const rootReducer = combineReducers({
  // getPinsUserResult: GetPinsUserResult
})

export type State = ReturnType<typeof rootReducer>

export default rootReducer
