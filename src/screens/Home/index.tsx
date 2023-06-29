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
  const params = useParams();
  const location = useLocation();
  console.log({ params, location })

  const navigate = useNavigate();

  interface DefaultEventsMap{
    [eventName: string]: any;
  }
  const loginResult = useSelector((state: State) => state.loginResult)
  const isAuth=localStorage.getItem('id')
  const isGetMe=loginResult?.response
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

useEffect(() => {
  if (!isAuth && !isGetMe) {
    
  } else if (!localStorage.getItem('id') && !socket) {
    setSocket(
      io("http://localhost:3000")
    );
  }
}, [isAuth, isGetMe, navigate, socket]);


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
          <ChatColumn socket={socket}/>
        </Box>
      </Stack>
    </>
  )
}

export default Home



