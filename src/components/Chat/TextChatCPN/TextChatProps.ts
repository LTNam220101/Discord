import { Socket } from "socket.io-client";

export interface TextChatProps {
    socket: Socket; // Kiểu dữ liệu socket ở đây tuỳ thuộc vào thư viện socket nào bạn đang sử dụng
  }