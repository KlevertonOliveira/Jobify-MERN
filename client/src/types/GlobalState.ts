import { Alert } from './Alert';
import { Job } from './Job';
import { User } from './User';

export interface GlobalState {
  isLoading: boolean;
  isEditing: boolean;
  showAlert: boolean;
  showSidebar: boolean;
  editingJobId: string;
  alert: Alert;
  user: User | null;
  token: string | null;
  userLocation: string;
  jobs: Job[];
  totalJobs: number;
  numberOfPages: number;
  currentPage: number;
}