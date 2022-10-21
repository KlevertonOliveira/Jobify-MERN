import { createContext, ReactNode, useContext, useReducer } from 'react';
import { Alert } from '../types/Alert';
import { State } from '../types/State';
import { reducer } from './reducer';

interface AppContextData {
  state: State,
  displayAlert: (alert: Alert) => void,
  clearAlert: () => void;
}

const AppContext = createContext({} as AppContextData);

const initialState: State = {
  isLoading: false,
  showAlert: false,
  alert: {
    type: 'error',
    message: 'something went wrong'
  }
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

  return (
    <AppContext.Provider value={
      {
        state,
        displayAlert,
        clearAlert
      }
    }>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}