export interface Message {
    _id: string;
    author: {
      avatarUrl?: string;
      fullname?: string;
    };
    createdAt?: string;
    content?: string;
  }