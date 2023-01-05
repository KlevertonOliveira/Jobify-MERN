import { Navigate } from 'react-router-dom';
import { Loading } from '../components';
import { useAppContext } from '../contexts/appContext';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const {
    state: { user, isFetchingUserInfo },
  } = useAppContext();

  if (isFetchingUserInfo) {
    return <Loading center />;
  }

  if (!user) {
    return <Navigate to='/landing' />;
  }

  return children;
}
