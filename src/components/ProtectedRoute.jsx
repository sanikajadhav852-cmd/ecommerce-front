// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({
  adminOnly = false,      // If true → only admins allowed
  restrictAdmin = false,  // If true → admins NOT allowed (e.g. /profile)
  children,               // For direct children (if not using <Outlet />)
}) {
  const { isAuthenticated, user } = useAuthStore();

  // 1. Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user?.company === 'ADMIN';

  // 2. Admin-only route → non-admins go to home
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // 3. Normal user-only route → admins go to admin dashboard
  if (restrictAdmin && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // All checks passed → render the protected content
  return children ? children : <Outlet />;
}