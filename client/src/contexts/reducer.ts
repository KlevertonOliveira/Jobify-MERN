import { Alert } from '../types/Alert';
import { GlobalState } from '../types/GlobalState';
import { Job } from '../types/Job';
import { User } from '../types/User';
import {
  OPERATION_BEGIN,
  OPERATION_END,
  AUTHENTICATE_USER,
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  GET_JOBS,
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
        token: string;
        location: string;
      };
    }
  | { type: typeof LOGOUT_USER }
  | {
      type: typeof GET_JOBS;
      payload: {
        jobs: Job[];
        totalJobs: number;
        numberOfPages: number;
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
        token: action.payload.token,
        userLocation: action.payload.location,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
        userLocation: '',
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numberOfPages: action.payload.numberOfPages,
      };
    default:
      return state;
  }
}
