import React, { FC, useEffect, useState } from "react"
import {
  Box,
  Stack,
  Popover,
  Typography,
  useTheme,
  Menu,
  MenuItem
} from "@mui/material"
import * as colors from "@mui/material/colors"
import PeopleAltTwoTone from "@mui/icons-material/PeopleAltTwoTone"
import { useNavigate } from "react-router"
import { ServerItemProps } from "./ServerItemProps"
import NiceModal from "@ebay/nice-modal-react"

// import CreateInvitationDialog from "../CreateInvitationDialog"
import { useDispatch, useSelector } from "react-redux"
import { DELETE_SERVER, GET_SERVER_INFO } from "../../redux-saga/actions"
import { State } from "../../redux-saga/reducers"

import ServerSettingDialog from "../ServerSetting/ServerSettingDialog"
import AddChannelDialog from "../AddServerBtn/AddChannelDialog"
import { getServerInfo } from "../../redux-saga/reducers/Server/GetServerById/actions"
import { deleteServer } from "../../redux-saga/reducers/Server/DeleteServer/actions"
import CreateInvitationDialog from "../CreateInvitationDialog"
import { login } from "../../redux-saga/sagas/Authentication"
import { getListServerJoined } from "../ServersList/actions"



function ServerItem({
  isDirect = false,
  serverId,
  name,
  imgUrl
}: ServerItemProps) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const navigate = useNavigate()
  // get this from server
  const isSelected = false
  const [isHover, setIsHover] = useState(false)
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number
    mouseY: number
    serverId?: number
  } | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsHover(true)
    setAnchorEl(event.currentTarget)
  }
  // const currentServer = useSelector((state: State) => state.getServerInfo?.currentServer?.response);
  // const listJoinedServer = useSelector(
  //   (state: State) => state.createServer.listJoinedServer[0]?.response?.data
  // );
  // console.log(listJoinedServer)
  // if (currentServer) {
  //   // Truy cập vào các thuộc tính của currentServer
  //   console.log(currentServer);
  // } else {
  //   console.log("currentServer is undefined");
  // }
  const loginResult = useSelector((state: State) => state.loginResult)
  console.log(loginResult)
  useEffect(() => {
    dispatch(getServerInfo({ serverId: serverId }))
  }, [serverId])
  const getServerInfor = useSelector((state: State) => state.getServerByIdResult)
  const ownerId = getServerInfor?.response?.ownerId
  const loginResultId = localStorage.getItem("id")

  console.log(ownerId)
  console.log(loginResultId)
 
 
  const handleDelete= ()=>{
    console.log(serverId)
    dispatch(deleteServer({ serverId :serverId}));

    dispatch(getListServerJoined())
  }
  const deleteServerResulT=useSelector((state:State)=>state.deleteServerResult)
  console.log(deleteServerResulT)
  if(deleteServerResulT?.response?.status===200){
    dispatch(getListServerJoined())
  }
  return (
    <Stack
      width="100%"
      direction="row"
      spacing={1}
      pr={2}
      justifyContent="space-between"
      alignItems="center"
      onClick={() => {
        navigate(`/channels/${serverId}`);
        dispatch(getServerInfo({ serverId }))
        console.log(serverId)
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        setIsHover(false)
        setContextMenu(
          contextMenu === null
            ? {
              mouseX: e.clientX + 2,
              mouseY: e.clientY - 6,
              serverId: serverId
            }
            : null
        )
      }}

    >
      <Menu
        open={contextMenu !== null}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            // dispatch(getServerInfoAction(serverId))
            NiceModal.show(ServerSettingDialog,{ serverId: String(contextMenu?.serverId) })
          }}
        >
          Server Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            NiceModal.show(CreateInvitationDialog, { serverId: String(contextMenu?.serverId) });

          }}
        >
          Create invitation
        </MenuItem>

        <MenuItem
          onClick={() => {
            // dispatch(getServerInfoAction(serverId))
            NiceModal.show(AddChannelDialog, /*{ serverId }*/)
          }}
        >
          Add channel
        </MenuItem>
        {loginResultId === ownerId && (
          <MenuItem
            onClick={() =>handleDelete()}
          >
            Delete Server
          </MenuItem>
        )}
      </Menu>
      <Box
        height={isSelected ? "40px" : "20px"}
        width="3px"
        sx={{
          bgcolor: isSelected || isHover ? "white" : "transparent",
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5
        }}
      ></Box>

      <Box
        onMouseEnter={() => handleMouseEnter}
        onMouseLeave={() => {
          setIsHover(false)
          setAnchorEl(null)
        }}
        height={48}
        width={48}
        borderRadius={isSelected ? "35%" : "50%"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={
          theme.palette.mode === "light" ? colors.grey[300] : colors.grey[800]
        }
        sx={{
          backgroundImage: imgUrl ? `url(${imgUrl})` : "",
          backgroundPosition: "center",
          backgroundSize: "cover",
          ":hover": {
            cursor: "pointer",
            borderRadius: "35%",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
          }
        }}
      >
        {isDirect ? (
          <PeopleAltTwoTone />
        ) : imgUrl ? null : (
          <Typography variant="h5" component="h2">
            {name ? name[0]?.toUpperCase() : ""}
          </Typography>
        )}
      </Box>

      <Popover
        sx={{
          pointerEvents: "none",
          ml: 1
        }}
        open={isHover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left"
        }}
        onClose={() => {
          setIsHover(false)
          setAnchorEl(null)
        }}
      >
        <Typography sx={{ p: 1 }} variant="body1" component="p">
          {name}
        </Typography>
      </Popover>
    </Stack>
  )
}

export default ServerItem
