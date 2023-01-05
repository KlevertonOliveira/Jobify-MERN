import { Alert } from '../types/Alert';
import { GlobalState } from '../types/GlobalState';
import { User } from '../types/User';
import {
  OPERATION_BEGIN,
  OPERATION_END,
  AUTHENTICATE_USER,
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  FETCHING_USER_INFO,
  GET_CURRENT_USER,
} from './actions';
import { initialState } from './appContext';

type Action =
  | { type: typeof DISPLAY_ALERT; payload: { alert: Alert } }
  | { type: typeof CLEAR_ALERT }
  | { type: typeof TOGGLE_SIDEBAR }
  | { type: typeof OPERATION_BEGIN }
  | { type: typeof OPERATION_END }
  | {
      type: typeof AUTHENTICATE_USER;
      payload: {
        user: User;
        location: string;
      };
    }
  | { type: typeof LOGOUT_USER }
  | { type: typeof FETCHING_USER_INFO }
  | {
      type: typeof GET_CURRENT_USER;
      payload: {
        user: User;
        location: string;
      };
    };

export function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alert: action.payload.alert,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case OPERATION_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case OPERATION_END:
      return {
        ...state,
        isLoading: false,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.payload.user,
        userLocation: action.payload.location,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        isFetchingUserInfo: false,
      };
    case FETCHING_USER_INFO:
      return {
        ...state,
        isFetchingUserInfo: true,
        showAlert: false,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        isFetchingUserInfo: false,
        user: action.payload.user,
        userLocation: action.payload.location,
      };
    default:
      return state;
  }
}
