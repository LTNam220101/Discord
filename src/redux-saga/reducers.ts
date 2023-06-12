import { combineReducers } from "@reduxjs/toolkit"
// import { GetNotiResult } from "components/Notification/reducers"
//Reducer sẽ viết khi ghép api
const rootReducer = combineReducers({
  // getPinsUserResult: GetPinsUserResult
})

export type State = ReturnType<typeof rootReducer>

export default rootReducer
