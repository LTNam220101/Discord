import React from "react"
import { Box, Stack } from "@mui/material"
import { Helmet } from "react-helmet"
import { Outlet } from "react-router-dom"
import ServersList from "../../components/ServersList"
import ServerInfo from "../../components/ServerInfo"
import Chat from "./../../components/Chat/ChatColumn"
import Register from "../Register"
import { useDispatch, useSelector } from "react-redux"
import { AuthState } from "../../redux-saga/type"
import { State } from "../../redux-saga/reducers"
import ContentSettingServer from "../../components/ServerSetting/ContentSettingServer"
import ServerSettingDialog from "../../components/ServerSetting/ServerSettingDialog"
import { ADD_USER_TO_SERVER_ROLE } from "../../redux-saga/actions"


const Home = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: State) => (state.login.signIn.userInfo as any)).id;
  console.log(userId);
  const currentServer = useSelector((state: State) => state.getServerInfo?.currentServer?.response);
  console.log(currentServer);
  
  if(currentServer&&userId){
    if(userId===currentServer.ownerId){
      dispatch({type:ADD_USER_TO_SERVER_ROLE,payload:{userId:userId,serverId:currentServer._id,RoleId:"6492d196faac11f2ff0b3fed"}})
    }
  }
  return (
    <>
      {console.log('hi')}
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
          <Chat />
        </Box>

        <Box>
          {/* <ServerSettingDialog id={""} /> */}
        </Box>
      </Stack>
    </>
  );
};

export default Home;

