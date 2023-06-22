import React, { useEffect } from "react"
import { Stack, useTheme } from "@mui/material"
import ServerItem from "../ServerItem"
import AddServerBtn from "../AddServerBtn/AddServerOnColumn"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../redux-saga/reducers"
import LazyLoadComponent from "react-lazyload"
import { getListServerJoined } from "./actions"
import ServerPublic from "../ServerPublic/ServerPublic"

const ServersList = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const listServerJoined = useSelector(
    (state: State) => state.getListServerJoinedResult
  )
  console.log(listServerJoined)

  useEffect(() => {
    dispatch(getListServerJoined())
  }, [dispatch])

  return (
    <Stack
      direction="column"
      height="100%"
      py={1}
      spacing={2}
      bgcolor="rgba(30,31,34,255)"
    >
      <ServerItem isDirect={true} name="Direct Messages" />

      {listServerJoined &&
        listServerJoined.success &&
        (listServerJoined?.response as any).data.map((server: any) => (
          <div key={server._id} style={{ height: "100px" }}>
            <LazyLoadComponent>
              <ServerItem
                serverId={server._id}
                name={server.name}
                imgUrl={
                  server.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${server.name
                    ?.split(" ")
                    .join()}&background=313338&color=d6d9dc&font-size=0.33`
                }
              />
            </LazyLoadComponent>
          </div>
        ))}
      <ServerPublic />
      <AddServerBtn />
    </Stack>
  )
}

export default ServersList
