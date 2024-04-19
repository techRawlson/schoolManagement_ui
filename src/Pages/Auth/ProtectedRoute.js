import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './Pages/Auth/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
