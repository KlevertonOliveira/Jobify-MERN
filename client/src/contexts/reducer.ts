import { Alert } from '../types/Alert';
import { State } from '../types/State';
import { CLEAR_ALERT, DISPLAY_ALERT } from './actions';

type Action =
  | { type: typeof DISPLAY_ALERT, payload: { alert: Alert } }
  | { type: typeof CLEAR_ALERT }

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

    default:
      return state;
  }
}
