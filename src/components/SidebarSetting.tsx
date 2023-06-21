import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { colors, Divider } from "@mui/material"
import { Stack } from "@mui/system"
import LogoutIcon from "@mui/icons-material/Logout"
import { useDispatch, useSelector } from "react-redux"
// import { logout } from 'src/features/authen/authenSlice';
import { logout } from "./../screens/UserSetting/actions"
import { State } from "../redux-saga/reducers"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { LOGIN_CLEAR } from "../screens/Login/reducers"

function SidebarSetting(props: any) {
  const dispatch = useDispatch()

  const logoutResult = useSelector((state: State) => state.logoutResult)

  const navigate = useNavigate()
  useEffect(() => {
    if (logoutResult) {
      if (logoutResult.success) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("id")
        dispatch({
          type: LOGIN_CLEAR
        })
        navigate("/login")
      }
    }
  }, [logoutResult])

  const styleTab = {
    height: 30,
    mr: 0.5,
    mt: 0.3,
    borderRadius: 1,
    color: colors.grey[500],
    "&:hover": {
      backgroundColor: colors.grey[800],
      color: colors.grey[200]
    },
    cursor: "pointer"
  }
  const [index, setIndex] = useState(0)

  return (
    <Stack pr={1}>
      <Box
        height="100%"
        py={6}
        sx={{ display: "flex", flexDirection: "row-reverse" }}
      >
        <Box>
          <Box sx={{ width: 200 }}>
            <Typography variant="h6">USER SETTINGS</Typography>
          </Box>
          <Stack className="tabList">
            <Stack
              justifyContent="center"
              sx={styleTab}
              bgcolor={index === 0 ? colors.grey[800] : ""}
              color={colors.grey[400]}
              onClick={() => {
                setIndex(0)
                props.handleIndexTab(0)
              }}
            >
              <Typography color={index === 0 ? colors.grey[100] : ""} px={2}>
                My Account
              </Typography>
            </Stack>
            <Stack
              justifyContent="center"
              sx={styleTab}
              bgcolor={index === 1 ? colors.grey[800] : ""}
              onClick={() => {
                setIndex(1)
                props.handleIndexTab(1)
              }}
            >
              <Typography color={index === 1 ? colors.grey[100] : ""} px={2}>
                My Profiles
              </Typography>
            </Stack>
            <Box py={1}>
              <Divider color={colors.grey[400]} />
            </Box>
            <Stack
              sx={styleTab}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              onClick={() => dispatch(logout())}
            >
              <Typography px={2}>Log Out</Typography>
              <LogoutIcon fontSize="small" />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Stack>
  )
}

export default SidebarSetting
