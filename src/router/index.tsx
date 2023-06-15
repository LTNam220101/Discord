import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from "react-router-dom"
// import { getKey } from 'utils/localStorage';
//import { State } from "redux-saga/reducers"
//import { initMarket, initSocket } from "./actions"
import Home from "../screens/Home"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import * as colors from "@mui/material/colors"
import { ToastContainer } from "react-toastify"
import Login from "../screens/Login"
import Register from "../screens/Register"
import UserSetting from "../screens/UserSetting/UserSetting"
import TextChatCpn from "../components/Chat/TextChatCPN/TextChatCPN"
import ServerSetting from "../screens/ServerSetting/ServerSetting"
import NiceModal from "@ebay/nice-modal-react"

const ProtectedRoute = ({ user, redirectPath = "/login", children }: any) => {
  // change this
  if (user) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

const Router = () => {
  const dispatch = useDispatch()
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: colors.blue[500],
            light: colors.blue[700],
            dark: colors.blue[300]
          },
          secondary: {
            main: colors.pink[500],
            light: colors.pink[700],
            dark: colors.pink[300]
          },
          grey: {
            ...colors.grey
          }
        }
      }),
    []
  )
  //   const user = localStorage.getItem("refreshToken")
  //   const id = localStorage.getItem("id")

  // const appStatus = useSelector(getAppStatus);

  //   useEffect(() => {
  //     dispatch(initSocket())
  //   }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NiceModal.Provider>
          <CssBaseline />
          <ToastContainer />
          <Routes>
            <Route
              path=""
              element={
                <ProtectedRoute /*user={user}*/>
                  <Home />
                  {/* <UserSetting /> */}
                  {/* <TextChatCpn /> */}
                  {/* <ServerSetting /> */}
                </ProtectedRoute>
              }
            >
              <Route path="" element={<Home />} />
              <Route path="/channels/:serverId" element={<Home />} />
              <Route path="/channels/:serverId/:channelId" element={<Home />} />
              <Route path="/setting" element={<UserSetting />} />

              {/* Thêm route mới ở đây vd /channels/:serverId, /channels/:serverId/:channelId, /setting */}
              {/* <Route path="" element={<Home />} />
            <Route path="" element={<Home />} /> */}
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </NiceModal.Provider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Router
