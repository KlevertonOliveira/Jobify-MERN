import { Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/appContext';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { state: { user } } = useAppContext();

  if (!user) {
    return <Navigate to='/landing' />
  }

  return children;
}