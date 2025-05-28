import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/AuthService';


export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const authenticated = isAuthenticated();
  console.log('Is authenticated:', authenticated);
  const user = JSON.parse(localStorage.getItem('employee') || '{}');

  if (!authenticated) {
    console.log('Not authenticated, redirecting to login....');
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log(`Role mismatch. Required: ${requiredRole}, User role: ${user.role}`); 
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};