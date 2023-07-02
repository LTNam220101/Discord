import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux-saga/store"
import Router from "./router"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
      <Router />
    </Provider>
)
