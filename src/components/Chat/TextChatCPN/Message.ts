export interface Message {
    _id: string;
    author: {
      avatarUrl?: string;
      username?: string;
    };
    createdAt?: string;
    content?: string;
  }