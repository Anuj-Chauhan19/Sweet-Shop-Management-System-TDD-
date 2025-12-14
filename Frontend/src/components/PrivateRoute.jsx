import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ requiredRole }) => {
  const { user } = useAuth();

  // 1. Not logged in -> Redirect to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Logged in but wrong role -> Redirect to Home
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // 3. Authorized -> Render the component
  return <Outlet />;
};

export default PrivateRoute;