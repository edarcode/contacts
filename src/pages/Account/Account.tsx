import { useAuth } from "../../auth/useAuth";
import Btn from "../../components/buttons/Btn/Btn";

export default function Account() {
  const logout = useAuth((auth) => auth.removeToken);
  return (
    <div>
      <div>Cuenta</div>
      <Btn onClick={logout}>Cerrar sesión</Btn>
    </div>
  );
}
