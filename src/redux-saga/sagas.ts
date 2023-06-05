import { all } from "redux-saga/effects"
import { login, register } from "./sagas/Authentication"

export default function* rootSaga() {
  yield all([login(), register()/*, continue(), */])
}
