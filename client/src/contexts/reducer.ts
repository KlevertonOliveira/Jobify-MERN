import { Alert } from '../types/Alert';
import { State } from '../types/State';
import { User } from '../types/User';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT, LOGOUT_USER, OPERATION_BEGIN, TOGGLE_SIDEBAR, USER_OPERATION_ERROR, USER_OPERATION_SUCCESS
} from './actions';
import { initialState } from './appContext';

type Action =
  | { type: typeof DISPLAY_ALERT, payload: { alert: Alert } }
  | { type: typeof CLEAR_ALERT }
  | { type: typeof OPERATION_BEGIN }
  | { type: typeof TOGGLE_SIDEBAR }
  | { type: typeof LOGOUT_USER }
  | {
    type: typeof USER_OPERATION_SUCCESS, payload: {
      user: User,
      token: string,
      location: string,
      successAlertMessage: string,
    }
  }
  | {
    type: typeof USER_OPERATION_ERROR, payload: {
      errorAlertMessage: string
    }
  }


export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alert: {
          type: action.payload.alert.type,
          message: action.payload.alert.message,
        }
      }
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
      }
    case OPERATION_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case USER_OPERATION_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        isLoading: false,
        showAlert: true,
        alert: {
          type: 'success',
          message: action.payload.successAlertMessage,
        }
      }
    case USER_OPERATION_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alert: {
          type: 'error',
          message: action.payload.errorAlertMessage
        }
      }
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar
      }
    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
        jobLocation: '',
        userLocation: '',
      }
    default:
      return state;
  }
}
