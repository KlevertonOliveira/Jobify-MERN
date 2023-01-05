import { Alert } from './Alert';
import { User } from './User';

export interface GlobalState {
  isLoading: boolean;
  showAlert: boolean;
  showSidebar: boolean;
  alert: Alert;
  user: User | null;
  userLocation: string;
}
