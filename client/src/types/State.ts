import { Alert } from './Alert';
import { User } from './User';

export type State = {
  isLoading: boolean,
  showAlert: boolean,
  alert: Alert,
  user: User | null,
  token: string | null,
  userLocation: string,
  jobLocation: string
}