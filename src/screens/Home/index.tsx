import React, { useEffect } from "react"
import { Box, Stack } from "@mui/material"
import { Helmet } from "react-helmet"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import ServersList from "../../components/ServersList"
import ServerInfo from "../../components/ServerInfo"
import Chat from "./../../components/Chat/ChatColumn"
import Register from "../Register"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../redux-saga/reducers"
// import ContentSettingServer from "../../components/ServerSetting/ContentSettingServer"
import ServerSettingDialog from "../../components/ServerSetting/ServerSettingDialog"
import ChatColumn from "./../../components/Chat/ChatColumn"
import { Socket, io } from "socket.io-client"
import { getServerInfo } from "../../redux-saga/reducers/Server/GetServerById/actions"
import { getChannelInfo } from "../../redux-saga/reducers/Channel/GetChannelById/actions"
const Home = () => {
  const dispatch = useDispatch()
  // const userId = useSelector(
  //   (state: State) => state.login.signIn.userInfo as any
  // ).id
  // console.log(userId)
  // const currentServer = useSelector(
  //   (state: State) => state.getServerInfo?.currentServer?.response
  // )
  // console.log(currentServer)

  // if (currentServer && userId) {
  //   if (userId === currentServer.ownerId) {
  //     dispatch({
  //       type: ADD_USER_TO_SERVER_ROLE,
  //       payload: {
  //         userId: userId,
  //         serverId: currentServer._id,
  //         RoleId: "6492d196faac11f2ff0b3fed"
  //       }
  //     })
  //   }
  // }
  const loginResult = useSelector((state: State) => state.loginResult)
  console.log(loginResult)
  const getServerInfo = useSelector((state: State) => state.getServerByIdResult)
  const idLoginResult = loginResult?.response?.id
  console.log(getServerInfo)


  const params = useParams();
  const location = useLocation();
  console.log({ params, location })

  const navigate = useNavigate();

  // const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);



  // useEffect(() => {
  //   if (!isAuth && !isGetMe) {
  //     navigate('/auth/sign-in', { state: { from: location.pathname } });
  //   } else if (isAuth && !socket) {
  //     setSocket(
  //       io("http://localhost:3000")
  //     );
  //   }
  // }, [isAuth, isGetMe, navigate, socket]);

  return (
    <>
      <Helmet>
        <title>{`Home | Discord`}</title>
      </Helmet>
      <Stack height="100vh" direction="row">
        <Box height="100%" maxWidth={80} overflow="auto">
          <ServersList />
        </Box>

        <Box height="100%" maxWidth={250} bgcolor="rgba(43,45,49,255)">
          <ServerInfo />
        </Box>

        <Box height="100%" width="100%">
          <ChatColumn />
        </Box>

        <Box>{/* <ServerSettingDialog id={""} /> */}</Box>
      </Stack>
    </>
  )
}

export default Home



