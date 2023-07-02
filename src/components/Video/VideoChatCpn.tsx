import React, { useState, useEffect } from "react"
import { Grid, Typography, Box, Button, Stack } from "@mui/material"
import { useSelector } from "react-redux"
import Peer from "simple-peer"
import Video from "./Video"
import { State } from "../../redux-saga/reducers"

function VideoChatCpn({ socket, channel }: any) {
  const userId = localStorage.getItem("id")

  const onMicrophone = useSelector((state: State) => state.app.onMicrophone)
  const onCamera = useSelector((state: State) => state.app.onCamera)

  const [isJoined, setIsJoined] = useState(false)

  const [localStream, setLocalStream] = useState<MediaStream>()
  const [peers, setPeers] = useState<any[]>([])

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream)
      })
  }, [channel])

  useEffect(() => {
    return () => {
      console.log(123)
      // component will unmount logic here
      if (peers) {
        peers.forEach((peer: any) => {
          peer.destroy()
        })
      }
      setPeers([])
      isJoined &&
        socket.emit("leaveChannel", { channelId: channel._id, userId: userId })
    }
  }, [channel, isJoined])

  useEffect(() => {
    // off microphone
    if (localStream) {
      localStream.getTracks()[0].enabled = onMicrophone
    }
  }, [onMicrophone, localStream])

  useEffect(() => {
    // off camera
    if (localStream) {
      localStream.getTracks()[1].enabled = onCamera
    }
  }, [onCamera, localStream])

  // const joinVideoCall = () => {
  //   socket.emit("joinChannel", {
  //     channelId: channel._id,
  //     userId: localStorage.getItem("id")
  //   })

  //   socket.on("acceptToVoiceChannel", (channelAccepted: any) => {
  //     console.log("accept to voice channel")
  //     if (channelAccepted._id !== channel._id) return
  //     setIsJoined(true)
  //     const tmpPeers = new Map()

  //     // Có user mới vào room
  //     // => tạo peer kiểu host, gửi signal về cho user đó qua event 'pair'
  //     socket.on("userJoinedVoiceChannel", (newUser: any) => {
  //       console.log("new user joined", newUser)
  //       if (newUser._id !== localStorage.getItem("id")) {
  //         const peer = new Peer({
  //           initiator: true,
  //           trickle: false,
  //           stream: localStream
  //         })
  //         tmpPeers.set(newUser._id, peer)

  //         peer.on("signal", (data) => {
  //           // Emit signal về cho user mới joined
  //           socket.emit("setupPeer", {
  //             isInitiator: true,
  //             from: userId,
  //             to: newUser._id,
  //             channelId: channel._id,
  //             signal: data
  //           })
  //         })

  //         peer.on("stream", (stream) => {
  //           setPeers((prev: any) => [
  //             ...prev,
  //             {
  //               peer,
  //               user: { id: newUser._id, name: newUser.fullname },
  //               stream
  //             }
  //           ])
  //         })

  //         peer.on("close", () => {
  //           peer.destroy()
  //         })
  //       }
  //     })

  //     // Khi đã được accept vào room, sau khi gửi signal đi, các user khác
  //     // sẽ gửi lại signal chờ kết nối với user này qua event 'pair'
  //     // Có 2 case: là user cũ, nhận được accept từ user mới join
  //     // hoặc là user mới, nhận được signal từ user cũ
  //     socket.on(
  //       "setupPeer",
  //       ({ isInitiator, from, to, channelId, signal }: any) => {
  //         console.log("setupPeer", {
  //           isInitiator,
  //           from,
  //           to,
  //           channelId,
  //           signal
  //         })
  //         if (to === userId && channelId === channel._id && from !== to) {
  //           // Đây là data từ user cũ gửi cho mình khi vừa joined
  //           if (isInitiator) {
  //             const peer = new Peer({
  //               initiator: false,
  //               trickle: false,
  //               stream: localStream
  //             })

  //             peer.on("signal", (data) => {
  //               socket.emit("setupPeer", {
  //                 isInitiator: false,
  //                 from: to,
  //                 to: from,
  //                 channelId,
  //                 signal: data
  //               })
  //             })

  //             peer.on("stream", (stream) => {
  //               setPeers((prev: any) => [
  //                 ...prev,
  //                 {
  //                   user: {
  //                     id: from,
  //                     name: channel.users.find((u: any) => u._id === from)
  //                       ?.fullname
  //                   },
  //                   stream,
  //                   peer
  //                 }
  //               ])
  //             })

  //             peer.signal(signal)
  //           } else {
  //             // Đây là data user mới joined gửi lại signal
  //             tmpPeers.get(from).signal(signal)
  //           }
  //         }
  //       }
  //     )

  //     socket.on("userLeftChannel", (userId: any) => {
  //       console.log("user left", userId)
  //       peers.forEach((peer: any) => {
  //         if (peer.user.id === userId) {
  //           peer.destroy()
  //         }
  //       })
  //       setPeers((prev: any) =>
  //         prev.filter((peer: any) => peer.user.id !== userId)
  //       )
  //     })
  //   })
  // }
  const joinVideoCall = () => {
    socket.emit("joinChannel", { channelId: channel._id, userId: userId })

    socket.on("acceptToVoiceChannel", (channelAccepted: any) => {
      console.log("accept to voice channel")
      if (channelAccepted._id !== channel._id) return
      setIsJoined(true)
      const tmpPeers = new Map()

      // Có user mới vào room
      // => tạo peer kiểu host, gửi signal về cho user đó qua event 'pair'
      socket.on("userJoinedVoiceChannel", (newUser: any) => {
        console.log("new user joined", newUser)
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: localStream
        })
        tmpPeers.set(newUser._id, peer)

        peer.on("signal", (data) => {
          // Emit signal về cho user mới joined
          socket.emit("setupPeer", {
            isInitiator: true,
            from: userId,
            to: newUser._id,
            channelId: channelAccepted._id,
            signal: data
          })
        })

        peer.on("stream", (stream) => {
          setPeers((prev) => [
            ...prev,
            {
              peer,
              user: { id: newUser._id, name: newUser.fullname },
              stream
            }
          ])
        })

        peer.on("close", () => {
          console.log("close")
          // peer.destroy();
        })
      })

      // Khi đã được accept vào room, sau khi gửi signal đi, các user khác
      // sẽ gửi lại signal chờ kết nối với user này qua event 'pair'
      // Có 2 case: là user cũ, nhận được accept từ user mới join
      // hoặc là user mới, nhận được signal từ user cũ
      socket.on(
        "setupPeer",
        ({ isInitiator, from, to, channelId, signal }: any) => {
          console.log("setupPeer", {
            isInitiator,
            from,
            to,
            channelId,
            signal
          })
          if (
            to === userId &&
            channelId === channelAccepted._id &&
            to !== from
          ) {
            // Đây là data từ user cũ gửi cho mình khi vừa joined
            if (isInitiator) {
              const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: localStream
              })

              peer.on("signal", (data) => {
                socket.emit("setupPeer", {
                  isInitiator: false,
                  from: to,
                  to: from,
                  channelId,
                  signal: data
                })
              })

              peer.on("stream", (stream) => {
                setPeers((prev) => [
                  ...prev,
                  {
                    user: {
                      id: from,
                      name: channelAccepted.users.find(
                        (u: any) => u._id === from
                      )?.fullname
                    },
                    stream,
                    peer
                  }
                ])
              })

              peer.signal(signal)
            } else {
              // Đây là data user mới joined gửi lại signal
              tmpPeers.get(from).signal(signal)
            }
          }
        }
      )

      socket.on("userLeftChannel", (userId: any) => {
        console.log("user left", userId)
        peers.forEach((peer) => {
          if (peer.user.id === userId) {
            peer.destroy()
          }
        })
        setPeers((prev) => prev.filter((peer) => peer.user.id !== userId))
      })
    })
  }
  const leaveVideoCall = () => {
    stopBothVideoAndAudio(localStream)
    setLocalStream(undefined)
    socket.emit("leaveChannel", { channelId: channel._id, userId: userId })
    setIsJoined(false)
    peers.forEach((peer: any) => {
      peer.destroy()
    })
    setPeers([])
    socket.off("userLeftChannel")
    socket.off("setupPeer")
    socket.off("userJoinedVoiceChannel")
    socket.off("acceptToVoiceChannel")
  }

  // stop both mic and camera
  function stopBothVideoAndAudio(stream: any) {
    stream.getTracks().forEach((track: any) => {
      if (track.readyState == "live") {
        track.stop()
      }
    })
  }

  const videoLayouts = React.useMemo(() => {
    const num = peers.length + 1
    if (num === 1) return 8
    if (num === 2) return 6
    if (num === 3) return 4
    if (num === 4) return 3
    return 3
  }, [peers.length])

  return (
    <Grid container spacing={2}>
      {localStream && (
        <Grid item xs={12} md={videoLayouts} sx={{ position: "relative" }}>
          <Stack>
            <Video playsInline muted autoPlay stream={localStream} />
            <Box
              p={1}
              borderRadius={4}
              sx={{ position: "absolute", bottom: 14, left: 22, opacity: 0.8 }}
              bgcolor="gray"
            >
              <Typography variant="body1">Me</Typography>
            </Box>
            <Button
              sx={{ display: isJoined ? "none" : "initial" }}
              onClick={joinVideoCall}
            >
              Join
            </Button>
          </Stack>
        </Grid>
      )}

      {peers.length > 0
        ? peers.map((peer: any, index: any) => {
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
                    position: "absolute",
                    bottom: 14,
                    left: 22,
                    opacity: 0.8
                  }}
                  bgcolor="gray"
                >
                  <Typography variant="body1">{peer?.user?.name}</Typography>
                </Box>
              </Grid>
            )
          })
        : null}
      <Button
        sx={{ display: !isJoined ? "none" : "initial" }}
        onClick={leaveVideoCall}
      >
        Join
      </Button>
    </Grid>
  )
}

export default VideoChatCpn
