import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Peer from 'simple-peer';
import Video from './Video';
// import useCheckAuth from 'src/hooks/useCheckAuth';
import { Socket } from 'socket.io-client';
import { User, VideoChatProps } from './VideoInterface';
import { Channel } from 'redux-saga';

function VideoChatCpn({ socket }: VideoChatProps) {
  // const { userData } = useCheckAuth();

  const curChannel = useSelector((state: any) => state.servers.currentChannel);
  const onMicrophone = useSelector((state: any) => state.app.onMicrophone);
  const onCamera = useSelector((state: any) => state.app.onCamera);

  const [isJoined, setIsJoined] = useState(false);

  const [localStream, setLocalStream] = useState<MediaStream | undefined>();
  const [peers, setPeers] = useState<any[]>([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      });
  }, []);

  useEffect(() => {
    return () => {
      peers.forEach((peer) => {
        peer.destroy();
      });
      setPeers([]);
      isJoined && socket.emit('leaveChannel');
    };
  }, [isJoined]);

  useEffect(() => {
    if (localStream) {
      localStream.getTracks()[0].enabled = onMicrophone;
    }
  }, [onMicrophone, localStream]);

  useEffect(() => {
    if (localStream) {
      localStream.getTracks()[1].enabled = onCamera;
    }
  }, [onCamera, localStream]);

  const joinVideoCall = () => {
    socket.emit('joinChannel', curChannel._id);

    socket.on('acceptToVoiceChannel', (channel: any) => {
      console.log('accept to voice channel');
      if (channel._id !== curChannel._id) return;
      setIsJoined(true);
      const tmpPeers: Map<string, any> = new Map();

      socket.on('userJoinedVoiceChannel', (newUser: User) => {
        console.log('new user joined', newUser);
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: localStream,
        });
        tmpPeers.set(newUser._id, peer);

        peer.on('signal', (data) => {
          socket.emit('setupPeer', {
            isInitiator: true,
            // from: userData?._id,
            to: newUser._id,
            channelId: channel._id,
            signal: data,
          });
        });

        peer.on('stream', (stream) => {
          setPeers((prev) => [
            ...prev,
            {
              peer,
              user: { id: newUser._id, name: newUser.fullname },
              stream,
            },
          ]);
        });

        peer.on('close', () => {
          console.log('close');
        });
      });

      socket.on('setupPeer', ({ isInitiator, from, to, channelId, signal }) => {
        console.log('setupPeer', {
          isInitiator,
          from,
          to,
          channelId,
          signal,
        });
        if (/*to === userData?._id &&*/ channelId === channel._id) {
          if (isInitiator) {
            const peer = new Peer({
              initiator: false,
              trickle: false,
              stream: localStream,
            });

            peer.on('signal', (data) => {
              socket.emit('setupPeer', {
                isInitiator: false,
                from: to,
                to: from,
                channelId,
                signal: data,
              });
            });

            peer.on('stream', (stream) => {
              setPeers((prev) => [
                ...prev,
                {
                  user: {
                    id: from,
                    name: channel.users.find((u: any) => u._id === from)?.fullname,
                  },
                  stream,
                  peer,
                },
              ]);
            });

            peer.signal(signal);
          } else {
            tmpPeers.get(from).signal(signal);
          }
        }
      });

      socket.on('userLeftChannel', (userId: string) => {
        console.log('user left', userId);
        peers.forEach((peer) => {
          if (peer.user.id === userId) {
            peer.destroy();
          }
        });
        setPeers((prev) => prev.filter((peer) => peer.user.id !== userId));
      });
    });
  };

  const videoLayouts = React.useMemo(() => {
    const num = peers.length + 1;
    if (num === 1) return 8;
    if (num === 2) return 6;
    if (num === 3) return 4;
    if (num === 4) return 3;
    return 3;
  }, [peers.length]);

  return (
    <Grid container spacing={2}>
      {localStream && (
        <Grid item xs={12} md={videoLayouts} sx={{ position: 'relative' }}>
          <Stack>
            <Video playsInline muted autoPlay stream={localStream} />
            <Box
              p={1}
              borderRadius={4}
              sx={{ position: 'absolute', bottom: 14, left: 22, opacity: 0.8 }}
              bgcolor="gray"
            >
              <Typography variant="body1">Me</Typography>
            </Box>
            <Button
              sx={{ display: isJoined ? 'none' : 'initial' }}
              onClick={joinVideoCall}
            >
              Join
            </Button>
          </Stack>
        </Grid>
      )}

      {peers.length > 0
        ? peers.map((peer, index) => {
          return (
            <Grid
              key={index}
              item
              xs={12}
              md={videoLayouts}
              position="relative"
            >
              <Video stream={peer.stream} playsInline autoPlay />
              <Box
                p={1}
                borderRadius={4}
                sx={{
                  position: 'absolute',
                  bottom: 14,
                  left: 22,
                  opacity: 0.8,
                }}
                bgcolor="gray"
              >
                <Typography variant="body1">{peer?.user?.name}</Typography>
              </Box>
            </Grid>
          );
        })
        : null}
    </Grid>
  );
}

export default VideoChatCpn;
