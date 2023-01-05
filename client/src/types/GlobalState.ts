import { Alert } from './Alert';
import { User } from './User';

export interface GlobalState {
  isFetchingUserInfo: boolean;
  isLoading: boolean;
  showAlert: boolean;
  showSidebar: boolean;
  alert: Alert;
  user: User | null;
  userLocation: string;
}
