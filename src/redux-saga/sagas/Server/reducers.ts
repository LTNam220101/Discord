import { Request } from "../../../interfaces";
import { ADD_USER_TO_SERVER_ROLE, ADD_USER_TO_SERVER_ROLE_SUCCESS, CREATESERVER, CREATESERVER_SUCCESS, DELETESERVER_SUCCESS, DELETE_SERVER, GETSERVERINFO_SUCCESS, GET_SERVER_INFO, LISTJOINSERVER, LISTJOINSERVER_SUCCESS, UPDATESERVER_SUCCESS, UPDATE_SERVER } from "../../actions";
import { State } from "../../reducers";
import { ServerState } from "../../type";
// const userInfoString = localStorage.getItem('userInfo');
// const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
const storedState = localStorage.getItem('initialState');
const parsedState = storedState ? JSON.parse(storedState) : null;

// Sử dụng parsedState khi cần thiết
// console.log(parsedState.listJoinedServer);
// console.log(parsedState.currentServer);
// console.log(parsedState.currentChannel);

const initialState: ServerState = {
    listJoinedServer: [],
    currentServer: {},
    currentChannel: {},
};
localStorage.setItem('initialState', JSON.stringify(initialState));

export function createServerReducer(state = initialState, request: Request<Record<string, unknown>>) {
    switch (request.type) {
        case CREATESERVER:
            return {
                ...state,
            }
        case CREATESERVER_SUCCESS:
            if (request.payload) {
                return {
                    ...state,
                    listJoinedServer: [...state.listJoinedServer, request.payload],
                    error: null,
                };
            }
            return state;
        default:
            return {
                ...state,
            };
    }
}
export function listJoinServerReducer(state = initialState, request: Request<Record<string, unknown>>) {
    switch (request.type) {
        case LISTJOINSERVER:
            return {
                ...state,
            }
        case LISTJOINSERVER_SUCCESS:
            if (request.payload) {
                return {
                    ...state,
                    listJoinedServer: request.payload,
                    error: null,
                };
            }
            return state;
        default:
            return {
                ...state,
            };
    }
}
export function updateServerReducer(state = initialState, request: Request<Record<string, unknown>>) {
    switch (request.type) {
        case UPDATE_SERVER:
            return {
                ...state,
            }
        case UPDATESERVER_SUCCESS:
            if (request.payload) {
                return {
                    ...state,
                    name:request.payload,
                    error: null,
                };
            }
            return state;
        default:
            return {
                ...state,
            };
    }
}
export function deleteServerReducer(state = initialState, request: Request<Record<string, unknown>>) {
    switch (request.type) {
      case DELETE_SERVER:
        return {
          ...state,
        };
      case DELETESERVER_SUCCESS:
        if (request.payload && request.payload.listJoinedServer) {
        const serverDelete=request.payload.serverIdDelete
          const newListJoinedServer = (request.payload.listJoinedServer as any[]).filter(
            (server: { _id: string; }) => server._id !== serverDelete
          );
          return {
            ...state,
            listJoinedServer: newListJoinedServer,
            error: null,
          };
        }
        return state;
      default:
        return {
          ...state,
        };
    }
  }
  
  
export function getServerInfoReducer(state = initialState, request: Request<Record<string, unknown>>) {
    switch (request.type) {
        case GET_SERVER_INFO:
            return {
                ...state,
            }
        case GETSERVERINFO_SUCCESS:
            if (request.payload) {
                return {
                    ...state,
                    currentServer: request.payload,
                    error: null,
                };
            }
            return state;
        default:
            return {
                ...state,
            };
    }
}
export function addUserToServerRoleReducer(state = initialState, request: Request<Record<string, unknown>>) {
    switch (request.type) {
        case ADD_USER_TO_SERVER_ROLE:
            return {
                ...state,
            }
        case ADD_USER_TO_SERVER_ROLE_SUCCESS:
            if (request.payload) {
                return {
                    ...state,
                    error: null,
                };
            }
            return state;
        default:
            return {
                ...state,
            };
    }
}
export interface ListServerState {
    listJoinedServer: any[]; // Kiểu dữ liệu của listJoinedServer
    error: null; // Kiểu dữ liệu của error
    currentServer: any; // Kiểu dữ liệu của currentServer
    currentChannel: any; // Kiểu dữ liệu của currentChannel
  }
export default initialState