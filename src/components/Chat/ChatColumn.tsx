import React, { useContext, useEffect, useState } from "react"
import {
  IconButton,
  Stack,
  Typography,
  useTheme,
  TextField,
  Box
} from "@mui/material"
import { PeopleAltRounded as PeopleIcon } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
// import { RootState } from 'src/app/store';
// import useCheckAuth from 'src/hooks/useCheckAuth';
// import { addMessageToCurrentChannel } from 'src/features/server/serverSlice';

import NiceModal from "@ebay/nice-modal-react"
import TextChatCpn from "./TextChatCPN/TextChatCPN"
import ListUserChannel from "../ListUserChannelDialog"
import { useParams } from "react-router-dom"
import { getChannelInfo } from "../../redux-saga/reducers/Channel/GetChannelById/actions"
import { State } from "../../redux-saga/reducers"
import { SocketContext } from "../../global/socket"
import VideoChatCpn from "../Video/VideoChatCpn"

interface ChatColumnProps {
  socket: any // Type of socket object
}

const ChatColumn: React.FC<ChatColumnProps> = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { serverId, channelId } = useParams()
  const [msg, setMsg] = useState("")
  useEffect(() => {
    dispatch(getChannelInfo({ channelId: channelId, serverId: serverId }))
  }, [channelId, serverId])

  const getChannelInfor = useSelector(
    (state: State) => state.getChannelInfoResult
  )
  console.log(getChannelInfor)
  const socket = useContext(SocketContext)

  useEffect(() => {
    if (
      getChannelInfor &&
      getChannelInfor.success &&
      getChannelInfor?.response?.type === 0 &&
      socket
    ) {
      socket.emit("joinChannel", {
        channelId: getChannelInfor?.response?._id,
        userId: localStorage.getItem("id")
      })
      socket?.on("newMessage", (data: any) => {
        console.log(data)
        setMsg(data)
      })
      // socket?.on("acceptToChannel", (data: any) => {
      //   console.log(data)
      // })
      // socket?.on("userLeftChannel", (data: any) => {
      //   console.log(data)
      // })
    }
  }, [socket, getChannelInfor])

  return (
    <Stack height="100%" width="100%" bgcolor={theme.palette.grey[800]}>
      <Stack direction="row" p={1} boxShadow={theme.shadows[1]}>
        <Typography
          variant="subtitle1"
          component="h2"
          fontWeight="bold"
          alignSelf="center"
        >
          {/* {getChannelInfor?.response?.name} */}
        </Typography>

        <Stack direction="row" ml="auto" alignItems="center" spacing={1}>
          {/* {curChannel._id && ( */}
          <IconButton
            onClick={() =>
              NiceModal.show(ListUserChannel, {
                channelId: "2" /*curChannel._id*/
              })
            }
          >
            <PeopleIcon />
          </IconButton>
          {/* )} */}

          <TextField size="small" placeholder="Search" />
        </Stack>
      </Stack>

      {getChannelInfor?.response?.type === 0 ? (
        <TextChatCpn channel={getChannelInfor?.response} message={msg} />
      ) : getChannelInfor?.response?.type === 1 ? (
        <VideoChatCpn socket={socket} channel={getChannelInfor?.response} />
      ) : (
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3">Open a channel to begin</Typography>
        </Box>
      )}
    </Stack>
  )
}

export default ChatColumn
