import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children , requiredRole}) => {
  const { isAuthenticated , role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />; // Yetkisizse anasayfaya yönlendir
  }

  return children;
};

export default PrivateRoute;