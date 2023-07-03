import React, { useCallback, useContext, useEffect, useState } from "react"
import {
  Typography,
  Box,
  Stack,
  Avatar,
  colors,
  InputBase,
  IconButton
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { formatDistanceToNowStrict, format } from "date-fns"
import {
  AddCircleRounded as AddIcon,
  SendOutlined as SendIcon
} from "@mui/icons-material"
import { TextChatProps } from "./TextChatProps"
import { RootState } from "../../../redux-saga/store"
import { useParams } from "react-router-dom"
import { getChannelInfo } from "../../../redux-saga/reducers/Channel/GetChannelById/actions"
import { State } from "../../../redux-saga/reducers"
import { getAllMessage } from "./../../../redux-saga/reducers/Message/GetAllMessage/actions"
import { Message } from "./Message"
import { SocketContext } from "../../../global/socket"

function formatRelativeTimestamp(timestamp: Date): string {
  const now = new Date()
  const difference = now.getTime() - timestamp.getTime()
  const oneHourInMilliseconds = 60 * 60 * 1000
  const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000

  if (difference >= oneMonthInMilliseconds) {
    return format(timestamp, "MMM dd, hh:mm a")
  } else if (difference >= oneHourInMilliseconds) {
    return format(timestamp, "hh:mm a")
  }

  return formatDistanceToNowStrict(timestamp, { addSuffix: true })
}

function TextChatCpn({ channel, message }: any) {
  const [msgInput, setMsgInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])

  const ref = React.useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    // scroll to bottom
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [channel])

  useEffect(() => {
    dispatch(getAllMessage({ channelId: channel._id }))
  }, [channel])
  const getAllMessageRes = useSelector(
    (state: State) => state.getAllMessageResult
  )
  useEffect(() => {
    if (getAllMessageRes && getAllMessageRes.success) {
      setMessages(getAllMessageRes?.response as unknown as any)
    }
  }, [getAllMessageRes])

  const socket = useContext(SocketContext)
  useEffect(() => {
    setMessages((old) => [...old, message])
  }, [message])
  
  return (
    <>
      <Stack
        height="100%"
        width="100%"
        p={1}
        pr={12}
        spacing={1}
        sx={{ overflowY: "scroll" }}
        ref={ref}
      >
        {messages.map((message: Message) => (
          <Stack key={message?._id} direction="row" p={1} spacing={2}>
            <Avatar sizes="3" src={message?.author?.avatarUrl} />

            <Stack direction="column" width="100%">
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="subtitle1"
                  component="span"
                  fontWeight="bold"
                >
                  {message?.author?.username}
                </Typography>
                <Typography variant="caption" component="span">
                  {formatRelativeTimestamp(new Date(message.createdAt || 0))}
                </Typography>
              </Stack>

              <Typography variant="body1" component="p">
                {message?.content}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Box pb={2} px={2} sx={{ backgroundColor: "transparent" }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            backgroundColor: colors.grey[800],
            borderRadius: 2
          }}
        >
          <IconButton>
            <AddIcon />
          </IconButton>

          <InputBase
            placeholder={`Message #${channel.name}`}
            // variant="standard"
            multiline
            maxRows={10}
            fullWidth
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter" && msgInput.length > 0) {
                socket?.emit("sendMessage", {
                  channelId: channel._id,
                  content: msgInput,
                  userId: localStorage.getItem("id")
                })
                setMsgInput("")
              }
            }}
          />

          <IconButton
            onClick={() => {
              if (msgInput.length > 0) {
                socket?.emit("sendMessage", {
                  channelId: channel._id,
                  content: msgInput,
                  userId: localStorage.getItem("id")
                })
                setMsgInput("")
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </>
  )
}

export default TextChatCpn
