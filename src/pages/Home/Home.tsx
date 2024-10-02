import Btn from "../../components/buttons/Btn/Btn";
import InputPassword from "../../components/inputs/InputPassword/InputPassword";
import InputText from "../../components/inputs/InputText/InputText";
import LinkTo from "../../components/links/LinkTo/LinkTo";
import { REGISTER } from "../../router/children";
import css from "./css.module.css";

export default function Home() {
  return (
    <div className={css.home}>
      <form className={css.login}>
        <InputText placeholder="Correo" />
        <InputPassword placeholder="Contraseña" />
        <span className={css.wrapper_register}>
          ¿No tiene cuenta?<LinkTo to={REGISTER.to}>Registrarse</LinkTo>
        </span>
        <Btn>Iniciar sesión</Btn>
      </form>
    </div>
  );
}
