import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
import { State } from "../redux-saga/reducers"
import { SocketContext } from "../global/socket"
import { io, Socket } from "socket.io-client"

const ProtectedRoute = ({ user, redirectPath = "/login", children }: any) => {
  // change this
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

const Router = () => {
  const dispatch = useDispatch()
  const loginResult = useSelector((state: State) => state.loginResult)
  const user =
    (loginResult?.response?.refreshToken as string) ||
    localStorage.getItem("refreshToken")

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

  // const appStatus = useSelector(getAppStatus);
  const [socket, setSocket] = useState<Socket | undefined>(undefined)
  useEffect(() => {
    if (!socket) {
      setSocket(
        io(import.meta.env.VITE_APP_WS_SERVER, {
          query: {
            userId: localStorage.getItem("id")
          }
        })
      )
    }
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SocketContext.Provider value={socket}>
          <NiceModal.Provider>
            <CssBaseline />
            <ToastContainer />
            <Routes>
              <Route
                path=""
                element={
                  <ProtectedRoute user={user}>
                    <Home />
                    {/* <UserSetting /> */}
                    {/* <TextChatCpn /> */}
                    {/* <ServerSetting /> */}
                  </ProtectedRoute>
                }
              >
                <Route path="" element={<Home />} />
                <Route path="/channels/:serverId" element={<Home />} />
                <Route
                  path="/channels/:serverId/:channelId"
                  element={<Home />}
                />
                <Route path="/setting" element={<UserSetting id={""} />} />

                {/* Thêm route mới ở đây vd /channels/:serverId, /channels/:serverId/:channelId, /setting */}
                {/* <Route path="" element={<Home />} />
            <Route path="" element={<Home />} /> */}
              </Route>
              <Route path="login" element={<Login user={user} />} />
              <Route path="register" element={<Register user={user} />} />
            </Routes>
          </NiceModal.Provider>
        </SocketContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Router
