import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { LOGIN } from "./children";

export default function RouteProtector({ children }: Props) {
  const token = useAuth((auth) => auth.token);

  if (!token) return <Navigate to={LOGIN.to} replace />;

  return children;
}

type Props = {
  children: React.ReactNode;
};
