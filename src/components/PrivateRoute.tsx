import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

interface PrivateRouteProps {
  children: ReactNode;
  role: string;
}

export const PrivateRouteAuth = ({ children }: PrivateRouteProps) => {
  const { user } = useSelector((state: RootState) => state.users);

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const { user } = useSelector((state: RootState) => state.users);

  if (!user || user.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
