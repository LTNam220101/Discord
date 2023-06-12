import React from "react"
import { Box, Stack } from "@mui/material"
import { Helmet } from "react-helmet"
import { Outlet } from "react-router-dom"
import ServersList from "../../components/ServersList"
import ServerInfo from "../../components/ServerInfo"
import Chat from "../../components/Chat/ChatColumn"
import ChatColumn from "../../components/Chat/ChatColumn"

const Home = () => {
  return (
    <>
      <Helmet>
        <title>{`Home | Discord`}</title>
      </Helmet>
      <Stack height="100vh" direction="row">
        <Box height="100%" maxWidth={80}>
          <ServersList />
        </Box>

        <Box height="100%" maxWidth={250} bgcolor="rgba(43,45,49,255)">
          <ServerInfo />
        </Box>

        <Box height="100%" width="100%">
          <ChatColumn />
        </Box>
      </Stack>
    </>
  )
}

export default Home
