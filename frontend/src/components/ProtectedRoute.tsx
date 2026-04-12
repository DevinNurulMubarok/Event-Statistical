import { Navigate } from "react-router";
import { useAuth } from "../store/useAuth";

export default function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: "CUSTOMER" | "ORGANIZER" }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  
  return <>{children}</>;
}
