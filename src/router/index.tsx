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

const ProtectedRoute = ({ user, redirectPath = "/login", children }: any) => {
  // change this
  if (!user) {
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
        <CssBaseline />
        <ToastContainer />
        <Routes>
          <Route
            path=""
            element={
              <ProtectedRoute /*user={user}*/>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Router
