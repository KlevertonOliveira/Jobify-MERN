import { Alert } from '../types/Alert';
import { State } from '../types/State';
import { User } from '../types/User';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS
} from './actions';

type Action =
  | { type: typeof DISPLAY_ALERT, payload: { alert: Alert } }
  | { type: typeof CLEAR_ALERT }
  | { type: typeof REGISTER_USER_BEGIN }
  | {
    type: typeof REGISTER_USER_SUCCESS, payload: {
      user: User,
      token: string,
      location: string,
    }
  }
  | {
    type: typeof REGISTER_USER_ERROR, payload: {
      errorMessage: string
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
    case REGISTER_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case REGISTER_USER_SUCCESS:
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
          message: 'User created! Redirecting...'
        }
      }
    case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alert: {
          type: 'error',
          message: action.payload.errorMessage
        }
      }
    default:
      return state;
  }
}
