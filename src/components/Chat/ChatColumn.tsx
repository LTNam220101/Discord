import React, { useEffect } from 'react';
import {
  IconButton,
  Stack,
  Typography,
  useTheme,
  TextField,
  Box,
} from '@mui/material';
import { PeopleAltRounded as PeopleIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from 'src/app/store';
// import useCheckAuth from 'src/hooks/useCheckAuth';
// import { addMessageToCurrentChannel } from 'src/features/server/serverSlice';

// import VideoChatCpn from './VideoChatCpn';
import NiceModal from '@ebay/nice-modal-react';
import TextChatCpn from './TextChatCPN/TextChatCPN';
import ListUserChannel from '../ListUserChannelDialog';
import { useParams } from 'react-router-dom';
import { getChannelInfo } from '../../redux-saga/reducers/Channel/GetChannelById/actions';
import { State } from '../../redux-saga/reducers';


interface ChatColumnProps {
  socket: any; // Type of socket object
}

const ChatColumn: React.FC<ChatColumnProps> = ({ socket }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  console.log({channelId,serverId})
  if (serverId && channelId) {
    dispatch(getChannelInfo({ channel: channelId, serverId: serverId }));
  }
useEffect(()=>{
  dispatch(getChannelInfo({ channel: channelId, serverId: serverId }));
},[channelId,serverId])  
  
  const getChannelInfor=useSelector((state:State)=>state.getChannelInfoResult)
  console.log(getChannelInfor)
  // const curChannel = useSelector(
  //   (state: RootState) => state.servers.currentChannel
  // );
  // const { userData } = useCheckAuth();

  // useEffect(() => {
  //   curChannel?._id &&
  //     curChannel?.type === 'text' &&
  //     userData?._id &&
  //     socket &&
  //     socket.emit('joinChannel', curChannel?._id);
  // }, [userData?._id, socket, curChannel?._id, curChannel?.type]);

  // useEffect(() => {
  //   socket &&
  //     socket.on('newMessage', (data: any) => {
  //       dispatch(addMessageToCurrentChannel(data));
  //     });
  // }, [dispatch, socket]);

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
              NiceModal.show(ListUserChannel, { channelId: "2" /*curChannel._id*/ })
              }
            >
              <PeopleIcon />
            </IconButton>
          {/* )} */}

          <TextField size="small" placeholder="Search" />
        </Stack>
      </Stack>

      {getChannelInfor?.response?.type === 0 ? (
        <TextChatCpn socket={socket} />
      ) : (
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3">Open a channel to begin</Typography>
        </Box>)}
    </Stack>
  );
};

export default ChatColumn;
