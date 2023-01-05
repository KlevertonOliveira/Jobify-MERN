import axios from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { searchFormInitialState } from '../pages/Dashboard/AllJobs';
import { Alert } from '../types/Alert';
import { GlobalState } from '../types/GlobalState';
import { Job, JobsData } from '../types/Job';
import { SearchFormValues } from '../types/SearchFormValues';
import { DefaultStats } from '../types/Stats';
import { User } from '../types/User';
import { reducer } from './reducer';

interface IAppContextData {
  state: GlobalState;
  displayAlert: (alert: Alert) => void;
  clearAlert: () => void;
  authenticateUser: ({
    currentUser,
    endpoint,
    successAlertMessage,
  }: IAuthenticateUser) => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
  updateUser: (user: User) => void;
  createJob: (job: Job) => void;
  getJobs(searchFormValues: SearchFormValues, page?: number): Promise<JobsData>;
  deleteJob: (id: string) => void;
  updateJob: (id: string, job: Job) => void;
  getSingleJob: (id: string) => Promise<Job>;
  showStats: () => Promise<DefaultStats>;
}

interface ICurrentUser {
  email: string;
  name: string;
  password: string;
}

interface IAuthenticateUser {
  currentUser: ICurrentUser;
  endpoint: 'login' | 'register';
  successAlertMessage: string;
}

const AppContext = createContext({} as IAppContextData);

export const initialState: GlobalState = {
  isFetchingUserInfo: true,
  isLoading: false,
  showAlert: false,
  showSidebar: false,
  alert: {
    type: 'error',
    message: 'something went wrong',
  },
  user: null,
  userLocation: '',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  /* Axios */
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

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
  );

  /*  Functions */

  function displayAlert(alert: Alert) {
    dispatch({ type: 'DISPLAY_ALERT', payload: { alert } });
    clearAlert();
  }

  function clearAlert() {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERT' });
    }, 3000);
  }

  async function authenticateUser({
    currentUser,
    endpoint,
    successAlertMessage,
  }: IAuthenticateUser) {
    let alert = {} as Alert;

    dispatch({ type: 'OPERATION_BEGIN' });

    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endpoint}`,
        currentUser
      );
      const { user, location } = data;

      dispatch({
        type: 'AUTHENTICATE_USER',
        payload: { user, location },
      });
      alert = { type: 'success', message: successAlertMessage };
    } catch (error: any) {
      alert = { type: 'error', message: error.response.data.message };
    } finally {
      dispatch({ type: 'OPERATION_END' });
      displayAlert(alert);
    }
  }

  function toggleSidebar() {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }

  async function logoutUser() {
    await authFetch.get('/auth/logout');
    dispatch({ type: 'LOGOUT_USER' });
  }

  async function updateUser(currentUser: User) {
    let alert = {} as Alert;
    dispatch({ type: 'OPERATION_BEGIN' });

    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, location } = data;

      dispatch({
        type: 'AUTHENTICATE_USER',
        payload: { user, location },
      });
      alert = { type: 'success', message: 'User Profile Updated!' };
    } catch (error: any) {
      if (error.response.status === 401) return;
      alert = { type: 'error', message: error.response.data.message };
    } finally {
      dispatch({ type: 'OPERATION_END' });
      displayAlert(alert);
    }
  }

  async function createJob(job: Job) {
    let alert = {} as Alert;
    dispatch({ type: 'OPERATION_BEGIN' });

    try {
      await authFetch.post('/jobs', job);
      alert = { type: 'success', message: 'New Job Created!' };
    } catch (error: any) {
      if (error.response.status === 401) return;
      alert = { type: 'error', message: error.response.data.message };
    } finally {
      dispatch({ type: 'OPERATION_END' });
      displayAlert(alert);
    }
  }

  async function getJobs(searchFormValues: SearchFormValues, page?: number) {
    const { position, sort, status, type, location } = searchFormValues;

    let url = `/jobs/?status=${status}&type=${type}&sort=${sort}`;

    if (page) {
      url = `${url}&page=${page}`;
    }

    if (position) {
      url = `${url}&position=${position}`;
    }

    if (location) {
      url = `${url}&location=${location}`;
    }

    dispatch({ type: 'OPERATION_BEGIN' });

    try {
      const { data } = await authFetch.get(url);
      return data as JobsData;
    } catch (error) {
      logoutUser();
      throw new Error('Unable to get all jobs.');
    } finally {
      dispatch({ type: 'OPERATION_END' });
      clearAlert();
    }
  }

  async function getSingleJob(id: string) {
    dispatch({ type: 'OPERATION_BEGIN' });
    try {
      const { data } = await authFetch.get(`/jobs/${id}`);
      return data.job as Job;
    } catch (error: any) {
      if (error.response.status === 401) {
        logoutUser();
      }
      throw new Error('Unable to get job information.');
    } finally {
      dispatch({ type: 'OPERATION_END' });
    }
  }

  async function updateJob(id: string, job: Job) {
    let alert = {} as Alert;
    dispatch({ type: 'OPERATION_BEGIN' });

    try {
      await authFetch.patch(`/jobs/${id}`, job);
      alert = { type: 'success', message: 'Job updated!' };
    } catch (error: any) {
      if (error.response.status === 401) return;
      alert = { type: 'error', message: error.response.data.message };
    } finally {
      dispatch({ type: 'OPERATION_END' });
      displayAlert(alert);
    }
  }

  async function deleteJob(id: string) {
    let alert = {} as Alert;
    dispatch({ type: 'OPERATION_BEGIN' });

    try {
      await authFetch.delete(`/jobs/${id}`);
      alert = { type: 'success', message: 'Job removed!' };
      getJobs(searchFormInitialState);
    } catch (error: any) {
      if (error.response.status === 401) return;
      alert = { type: 'error', message: error.response.data.message };
    } finally {
      dispatch({ type: 'OPERATION_END' });
      displayAlert(alert);
    }
  }

  async function showStats() {
    dispatch({ type: 'OPERATION_BEGIN' });

    try {
      const { data } = await authFetch.get('/jobs/stats');

      const defaultStats: DefaultStats = {
        stats: data.stats,
        monthlyApplications: data.monthlyApplications,
      };

      return defaultStats;
    } catch (error: any) {
      logoutUser();
      throw new Error('Unable to fetch stats data.');
    } finally {
      dispatch({ type: 'OPERATION_END' });
      clearAlert();
    }
  }

  async function getCurrentUser() {
    dispatch({ type: 'FETCHING_USER_INFO_BEGIN' });

    try {
      const { data } = await authFetch.get('/auth/getCurrentUser');
      const { user, location } = data;

      dispatch({
        type: 'GET_CURRENT_USER',
        payload: {
          user,
          location,
        },
      });
    } catch (error: any) {
      if (error.response.status === 401) return;
      logoutUser();
    } finally {
      dispatch({ type: 'FETCHING_USER_INFO_END' });
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        displayAlert,
        clearAlert,
        authenticateUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        createJob,
        getJobs,
        deleteJob,
        updateJob,
        getSingleJob,
        showStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
