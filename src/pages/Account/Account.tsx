import { useAuth } from "../../auth/useAuth";
import Btn from "../../components/buttons/Btn/Btn";
import css from "./css.module.css";

export default function Account() {
  const logout = useAuth((auth) => auth.removeToken);
  return (
    <section className={css.account}>
      <Btn onClick={logout}>Cerrar sesión</Btn>
    </section>
  );
}
