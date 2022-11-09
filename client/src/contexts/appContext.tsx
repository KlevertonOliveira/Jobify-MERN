import axios from 'axios';
import { createContext, ReactNode, useContext, useReducer } from 'react';
import { Alert } from '../types/Alert';
import { State } from '../types/State';
import { addUserToLocalStorage } from '../utils/addUserToLocalStorage';
import { reducer } from './reducer';
interface AppContextData {
  state: State,
  displayAlert: (alert: Alert) => void,
  clearAlert: () => void,
  authenticateUser: ({ currentUser, endpoint, successAlertMessage }: AuthenticateUserArgs
  ) => void,
}

const AppContext = createContext({} as AppContextData);

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

const initialState: State = {
  isLoading: false,
  showAlert: false,
  alert: {
    type: 'error',
    message: 'something went wrong'
  },
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || ''
}

interface ICurrentUser {
  email: string,
  name: string,
  password: string
}

type AuthenticateUserArgs = {
  currentUser: ICurrentUser;
  endpoint: 'login' | 'register';
  successAlertMessage: string;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function displayAlert(alert: Alert) {
    dispatch({ type: 'DISPLAY_ALERT', payload: { alert } })
    clearAlert();
  }

  function clearAlert() {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERT' });
    }, 3000)
  }

  async function authenticateUser({ currentUser, endpoint, successAlertMessage }: AuthenticateUserArgs) {
    dispatch({ type: 'AUTH_USER_BEGIN' });

    try {

      const { data } = await axios.post(`/api/v1/auth/${endpoint}`, currentUser);
      const { user, token, location } = data;

      dispatch({
        type: 'AUTH_USER_SUCCESS', payload: {
          user,
          token,
          location,
          successAlertMessage
        }
      })
      addUserToLocalStorage(user, token, location);

    } catch (error: any) {
      dispatch({
        type: 'AUTH_USER_ERROR', payload: {
          errorAlertMessage: error.response.data.message
        }
      })
    }

    clearAlert();
  }

  return (
    <AppContext.Provider value={
      {
        state,
        displayAlert,
        clearAlert,
        authenticateUser,
      }
    }>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}