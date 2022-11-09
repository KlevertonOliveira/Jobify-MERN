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
  registerUser: (currentUser: IRegisterUser) => void,
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

interface IRegisterUser {
  email: string,
  name: string,
  password: string
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

  async function registerUser(currentUser: IRegisterUser) {
    dispatch({ type: 'REGISTER_USER_BEGIN' });

    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: 'REGISTER_USER_SUCCESS', payload: {
          user,
          token,
          location
        }
      })
      addUserToLocalStorage(user, token, location);

    } catch (error: any) {
      dispatch({
        type: 'REGISTER_USER_ERROR', payload: {
          errorMessage: error.response.data.message
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
        registerUser,
      }
    }>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}