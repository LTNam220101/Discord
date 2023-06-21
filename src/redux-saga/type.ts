

// export interface AuthState {
//   isLoggedIn: boolean;
//   username: string;
//   password:string;
//   repass:string;
//   email:string;
// }
interface SignInState {
  userInfo: any;
}

export interface AuthState {
  signIn: SignInState;
}
export interface ServerState {
  listJoinedServer: any[]; 
  currentServer: any; 
  currentChannel: any; 
}
