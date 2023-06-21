import { Socket } from "socket.io-client";

export interface User {
    _id: string;
    fullname: string;
}

export interface Channel {
    _id: string;
}

export interface VideoChatProps {
    socket: Socket; // Replace with the appropriate type for socket
}
// export interface VideoProps {
//     stream: any;
//   }

export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    stream: MediaStream;
  }