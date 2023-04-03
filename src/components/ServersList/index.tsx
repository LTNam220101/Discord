import React, { useState } from "react"
import { Stack, useTheme } from "@mui/material"
import ServerItem from "../ServerItem"
import AddServerBtn from "../AddServerBtn"

const listJoinedServer = [
  {
    _id: 1,
    name: "ABC",
    avatarUrl: undefined
  },
  {
    _id: 2,
    name: "LTN",
    avatarUrl: undefined
  },
  {
    _id: 3,
    name: "Nam",
    avatarUrl: undefined
  },
  {
    _id: 4,
    name: "Server",
    avatarUrl: undefined
  },
  {
    _id: 5,
    name: "TFT",
    avatarUrl: undefined
  }
]

const ServersList = () => {
  const theme = useTheme()

  return (
    <Stack
      direction="column"
      height="100%"
      py={1}
      spacing={2}
      backgroundColor="rgba(30,31,34,255)"
    >
      <ServerItem isDirect={true} name="Direct Messages" />

      {listJoinedServer.map((server) => (
        <ServerItem
          key={server._id}
          serverId={server._id}
          name={server.name}
          imgUrl={
            server.avatarUrl ||
            `https://ui-avatars.com/api/?name=${server.name
              .split(" ")
              .join()}&background=313338&color=d6d9dc&font-size=0.33`
          }
        />
      ))}

      <AddServerBtn />
    </Stack>
  )
}

export default ServersList
