import axios from 'axios';
import { createContext, ReactNode, useContext, useReducer } from 'react';
import { Alert } from '../types/Alert';
import { State } from '../types/State';
import { User } from '../types/User';
import { addUserToLocalStorage } from '../utils/addUserToLocalStorage';
import { removeUserFromLocalStorage } from '../utils/removeUserFromLocalStorage';
import { reducer } from './reducer';
interface AppContextData {
  state: State,
  displayAlert: (alert: Alert) => void,
  clearAlert: () => void,
  authenticateUser: ({ currentUser, endpoint, successAlertMessage }: AuthenticateUserArgs
  ) => void,
  toggleSidebar: () => void,
  logoutUser: () => void,
  updateUser: (user: User) => void;
}

interface ICurrentUser {
  email: string,
  name: string,
  password: string
}

interface AuthenticateUserArgs {
  currentUser: ICurrentUser;
  endpoint: 'login' | 'register';
  successAlertMessage: string;
}

const AppContext = createContext({} as AppContextData);

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

export const initialState: State = {
  isLoading: false,
  showAlert: false,
  showSidebar: false,
  alert: {
    type: 'error',
    message: 'something went wrong'
  },
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || ''
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  /* Axios */
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })

  authFetch.interceptors.request.use(
    (config) => {
      config.headers!['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  )

  /*  Functions */
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
    dispatch({ type: 'OPERATION_BEGIN' });

    try {

      const { data } = await axios.post(`/api/v1/auth/${endpoint}`, currentUser);
      const { user, token, location } = data;

      dispatch({
        type: 'USER_OPERATION_SUCCESS', payload: {
          user,
          token,
          location,
          successAlertMessage
        }
      })
      addUserToLocalStorage(user, token, location);

    } catch (error: any) {
      dispatch({
        type: 'USER_OPERATION_ERROR', payload: {
          errorAlertMessage: error.response.data.message
        }
      })
    }

    clearAlert();
  }

  function toggleSidebar() {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }

  function logoutUser() {
    dispatch({ type: 'LOGOUT_USER' })
    removeUserFromLocalStorage();
  }

  async function updateUser(currentUser: User) {
    dispatch({ type: 'OPERATION_BEGIN' });

    try {
      const { data } = await authFetch.patch('auth/updateUser', currentUser);
      const { user, token, location } = data;

      dispatch({
        type: 'USER_OPERATION_SUCCESS', payload: {
          user,
          token,
          location,
          successAlertMessage: 'User Profile Updated!'
        }
      })

      addUserToLocalStorage(user, token, location);

    } catch (error: any) {
      if (error.response.status !== 401) {
        dispatch({
          type: 'USER_OPERATION_ERROR', payload: {
            errorAlertMessage: error.response.data.message
          }
        })
      }
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
        toggleSidebar,
        logoutUser,
        updateUser
      }
    }>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}