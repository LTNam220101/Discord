import React, { useEffect } from "react"
import {
  Accordion,
  colors,
  Stack,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Link,
  Avatar,
  Badge,
  useTheme,
  IconButton,
  Button,
  MenuItem,
  Menu,
  Fade,
  Box
} from "@mui/material"
import {
  TagRounded as TagIcon,
  VolumeUpRounded as VolumeUpIcon,
  ExpandMoreRounded as ExpandMoreIcon,
  MicRounded as MicIcon,
  MicOffRounded as MicOffIcon,
  VideocamRounded as CameraIcon,
  VideocamOffRounded as CameraOffIcon,
  SettingsRounded as SettingsIcon,
  PersonAddAlt as AddPersonIcon,
  AddCircle as AddICon
} from "@mui/icons-material"
import { useSelector, useDispatch } from "react-redux"
import { Link as LinkDom, useParams, useRouteError } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { State } from "../../redux-saga/reducers"
import { AUTH_LOGOUT } from "../../redux-saga/actions"
import UserSetting from "../../screens/UserSetting/UserSetting"
import ServerSetting from "../../screens/ServerSetting/ServerSetting"
import InviteDialog from "../Dialog/InviteDialog"
import AddChannelDialog from "../AddServerBtn/AddChannelDialog"
import NiceModal from "@ebay/nice-modal-react"
import { getServerInfo } from "../../redux-saga/reducers/Server/GetServerById/actions"
import ChannelSettingDialog from "../Dialog/ChannelSettingDialog"
import { getAllChannelByServer } from "../../redux-saga/reducers/Channel/GetAllChannelByServer/actions"
import { getUser } from "../../redux-saga/reducers/User/GetUser/actions"
import Profiles from "../Profiles/Profiles"
import { logout } from "../../redux-saga/reducers/Authen/SignOut/actions"
import { LOGIN_CLEAR } from "../../redux-saga/reducers/Authen/SignIn/reducers"
import { LOGOUT_CLEAR } from "../../redux-saga/reducers/Authen/SignOut/reducers"

const ChannelRow = ({ channel, serverId }: { channel: any; serverId: string | undefined }) => {
  // const activeChannel = useSelector((state) => state.servers.currentChannel);
  console.log(channel)
  return (
    <Box
      borderRadius={1}
      p={0.5}
      sx={{
        '&:hover': {
          backgroundColor: colors.grey[700],
        },
        // backgroundColor:
        //   // channel._id === activeChannel._id ? colors.grey[800] : 'transparent',
      }}
      position="relative"
    >
       <Link
        component={LinkDom}
        underline="none"
        to={`/channels/${serverId}/${channel._id}`}
      >
        <Stack direction="row" spacing={1} color={colors.grey[500]}>
          {channel.type === 'text' ? <TagIcon /> : <VolumeUpIcon />}
          <Typography variant="subtitle2" component="h4">
            {channel.name}
          </Typography>
        </Stack>
      </Link>
      <IconButton
        size="small"
        sx={{ position: 'absolute', top: 0, right: 0 }}
        onClick={() =>
          NiceModal.show(ChannelSettingDialog, { channelId: channel._id })
        }
      >
        <SettingsIcon fontSize="small" sx={{ color: 'Grey' }} />
      </IconButton>
    </Box>
  );
};

function ServerInfo() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { serverId } = useParams()
  console.log(serverId)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null)

  const logoutResult = useSelector((state: State) => state.logoutResult)

  const navigate = useNavigate()
  useEffect(() => {
    if (logoutResult) {
      if (logoutResult.success) {
        handleClose()
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("id")
        dispatch({
          type: LOGIN_CLEAR
        })
        dispatch({
          type: LOGOUT_CLEAR
        })
        navigate("/login")
      }
    }
  }, [logoutResult])

  const HandleClick = () => {
    NiceModal.show(Profiles)
  };
  const handleProfile = () => {
    navigate("/profiles");
  }
  const handleLogout = () => {
    handleClose();
    dispatch({ type: AUTH_LOGOUT });
  };
  let nameServer: any = '';
  const getServerInfor = useSelector((state: State) => state.getServerByIdResult)
  if (getServerInfor && getServerInfor?.response && getServerInfor.success) {
    nameServer = getServerInfor.response?.name
  }
  const currentServer = getServerInfor?.response
  useEffect(() => {
    console.log(serverId)
    dispatch(getServerInfo({ serverId }))
    dispatch(getAllChannelByServer({ serverId }))
  }, [serverId])
  const getAllChannelByServerr = useSelector((state: State) => state.getAllChannelByServerResult)
  const getAllChannelByServerrr = getAllChannelByServerr?.response
  console.log(getAllChannelByServerrr)
  console.log(currentServer)
  console.log(getAllChannelByServerrr && Array.isArray(getAllChannelByServerrr) && getAllChannelByServerrr)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const userId=localStorage.getItem("id");
  useEffect(() => {
    console.log(userId)
    dispatch(getUser({ userId:userId }))
  }, [dispatch])
  const getUserResulT = useSelector((state: State) => state.getUserResult);

  useEffect(() => {
    console.log(getUserResulT);
  }, [getUserResulT]);
  return (
    <Stack height="100%" width="250px">
      <Stack>
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            color: colors.grey[300],
            height: "48px",
            fontWeight: "bold",
            borderRadius: 0,
            boxShadow: "0 2px 1px -1px rgba(30,31,34,255)",
            marginBottom: "20px",
            ":hover": {
              backgroundColor: "rgba(53,55,60,255)"
            }
          }}
        >
          {nameServer || "Loading..."}
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button"
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={() => {
              handleClose()
              NiceModal.show(InviteDialog)
            }}
          >
            <Stack width={190} direction="row" justifyContent="space-between">
              <Typography>Invite People</Typography>
              <AddPersonIcon fontSize="small" />
            </Stack>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose()
              // NiceModal.show(ServerSetting)
            }}
          >
            <Stack width={190} direction="row" justifyContent="space-between">
              <Typography>Server Settings</Typography>
              <SettingsIcon fontSize="small" />
            </Stack>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose()
              NiceModal.show(AddChannelDialog, { serverId: String(serverId) })
            }}
          >
            <Stack width={190} direction="row" justifyContent="space-between">
              <Typography>Create Channel</Typography>
              <AddICon fontSize="small" />
            </Stack>
          </MenuItem>
        </Menu>
      </Stack>

      {[
        ["text channel", 0],
        ["voice channel", 1]
      ].map(([title, type], key) => (
        
        <Accordion
          key={key}
          defaultExpanded={true}
          disableGutters={true}
          sx={{
            background: "transparent"
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: colors.grey[500] }} />}
            sx={{ flexDirection: "row-reverse", padding: 0 }}
          >
            <Typography
              color={colors.grey[500]}
              component="h3"
              variant="body2"
              sx={{ fontSize: "12px" }}
            >
             {`${title}`.toUpperCase()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={0.25}>
             
              {getAllChannelByServerrr && Array.isArray(getAllChannelByServerrr) && getAllChannelByServerrr
                .filter((item: any) => item.type === type)
                .map((item: any) => {
                  console.log('Current item:', item);
                  return (
                    <ChannelRow key={item._id} channel={item} serverId={serverId} />
                  );
                })}

            </Stack>



          </AccordionDetails>
        </Accordion>
      ))}

      <Stack
        direction="row"
        spacing={1}
        mt="auto"
        p={1}
        sx={{ backgroundColor: "rgba(35,36,40,255)" }}
      >
        <Stack
          direction="row"
          p={0.5}
          spacing={1}
          borderRadius={1}
          sx={{
            ":hover": {
              cursor: "pointer",
              backgroundColor: colors.grey[800]
            }
          }}
          onClick={HandleClick}
        >
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            color="success"
            overlap="circular"
            badgeContent=" "
            variant="dot"
          >
            <Avatar
              alt="personal avatar"
              // src={userData?.avatarUrl}
              sx={{ width: 36, height: 36 }}
            />
          </Badge>
          <Stack spacing={0.25}>
            <Typography variant="caption" fontWeight="bold">
              {/* {userInfo.username} */}
              {/* {userData?.fullname?.split(" ")[0]} */}
            </Typography>
            <Typography variant="caption" color="lightgray">
              {/* #{userInfo?.id.slice(0, 6)} */}
              {/* #{userData?._id.slice(0, 6)} */}
            </Typography>
          </Stack>
        </Stack>
        <Menu anchorEl={menuAnchor} open={menuOpen} onClose={handleClose}>
          {/* <MenuItem onClick={handleProfile}>{userInfo.username} # {userInfo.id.slice(0, 6)}</MenuItem> */}
          <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
        </Menu>
        <Stack direction="row" p={0.5} spacing={0.5}>
          <IconButton
            color="default"
            size="small"
            // onClick={() => dispatch(setOnMicrophone(!onMicrophone))}
          >
            {/* {onMicrophone ? <MicIcon /> : <MicOffIcon />} */}
            <MicIcon />
          </IconButton>

          <IconButton
            color="default"
            size="small"
            // onClick={() => dispatch(setOnCamera(!onCamera))}
          >
            {/* {onCamera ? <CameraIcon /> : <CameraOffIcon />} */}
            <CameraIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              NiceModal.show(UserSetting)
            }}
            color="default"
            size="small"
          >
            <SettingsIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ServerInfo
