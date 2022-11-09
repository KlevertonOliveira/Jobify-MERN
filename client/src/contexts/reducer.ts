import { Alert } from '../types/Alert';
import { State } from '../types/State';
import { User } from '../types/User';
import {
  AUTH_USER_BEGIN, AUTH_USER_ERROR, AUTH_USER_SUCCESS, CLEAR_ALERT,
  DISPLAY_ALERT
} from './actions';

type Action =
  | { type: typeof DISPLAY_ALERT, payload: { alert: Alert } }
  | { type: typeof CLEAR_ALERT }

  | { type: typeof AUTH_USER_BEGIN }
  | {
    type: typeof AUTH_USER_SUCCESS, payload: {
      user: User,
      token: string,
      location: string,
      successAlertMessage: string,
    }
  }
  | {
    type: typeof AUTH_USER_ERROR, payload: {
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

    case AUTH_USER_SUCCESS:
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
    case AUTH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alert: {
          type: 'error',
          message: action.payload.errorAlertMessage
        }
      }

    default:
      return state;
  }
}
