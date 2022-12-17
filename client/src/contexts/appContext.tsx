import axios from 'axios';
import { createContext, ReactNode, useContext, useReducer } from 'react';
import { Alert } from '../types/Alert';
import { GlobalState } from '../types/GlobalState';
import { Job } from '../types/Job';
import { User } from '../types/User';
import { addUserToLocalStorage } from '../utils/addUserToLocalStorage';
import { removeUserFromLocalStorage } from '../utils/removeUserFromLocalStorage';
import { reducer } from './reducer';

interface IAppContextData {
  state: GlobalState,
  displayAlert: (alert: Alert) => void,
  clearAlert: () => void,
  authenticateUser: ({ currentUser, endpoint, successAlertMessage }: IAuthenticateUser
  ) => void,
  toggleSidebar: () => void,
  logoutUser: () => void,
  updateUser: (user: User) => void
  createJob: (job: Job) => void;
}

interface ICurrentUser {
  email: string,
  name: string,
  password: string
}

interface IAuthenticateUser {
  currentUser: ICurrentUser;
  endpoint: 'login' | 'register';
  successAlertMessage: string;
}

const AppContext = createContext({} as IAppContextData);

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

export const initialState: GlobalState = {
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
  isEditing: false,
  editingJobId: '',
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

  async function authenticateUser({ currentUser, endpoint, successAlertMessage }: IAuthenticateUser) {
    let alert = {} as Alert;
    dispatch({ type: 'API_OPERATION_BEGIN' });

    try {
      const { data } = await axios.post(`/api/v1/auth/${endpoint}`, currentUser);
      const { user, token, location } = data;

      dispatch({ type: 'AUTHENTICATE_USER', payload: { user, token, location } })
      addUserToLocalStorage(user, token, location);
      alert = { type: 'success', message: successAlertMessage };
    }     
    catch (error: any) {
      alert = { type: 'error', message: error.response.data.message }
    }
    finally {
      dispatch({ type: 'API_OPERATION_END' });
      displayAlert(alert);
    }
  }

  function toggleSidebar() {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }

  function logoutUser() {
    dispatch({ type: 'LOGOUT_USER' })
    removeUserFromLocalStorage();
  }

  async function updateUser(currentUser: User) {
    let alert = {} as Alert;
    dispatch({ type: 'API_OPERATION_BEGIN' });

    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, token, location } = data;

      dispatch({ type: 'AUTHENTICATE_USER', payload: { user, token, location } })
      addUserToLocalStorage(user, token, location);
      alert = { type: 'success', message: 'User Profile Updated!' };
    }
    catch (error: any) {
      if (error.response.status === 401) return;
      alert = { type: 'error', message: error.response.data.message };
    }
    finally {
      dispatch({ type: 'API_OPERATION_END' });
      displayAlert(alert);
    }
  }

  async function createJob(job: Job) {
    let alert = {} as Alert;
    dispatch({ type: 'API_OPERATION_BEGIN' });

    try {
      await authFetch.post('/jobs', job);
      alert = { type: 'success', message: 'New Job Created!' };
    }
    catch (error: any) {
      if (error.response.status === 401) return;
      alert = { type: 'error', message: error.response.data.message };
    }
    finally {
      dispatch({ type: 'API_OPERATION_END' });
      displayAlert(alert);
    }
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
        updateUser,
        createJob
      }
    }>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}