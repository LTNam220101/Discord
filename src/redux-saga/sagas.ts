import { all } from "redux-saga/effects"
import { login, logout, register } from "./sagas/Authentication"

export default function* rootSaga() {
  yield all([login(), register(), logout()])
}
