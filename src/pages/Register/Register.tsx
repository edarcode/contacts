import Btn from "../../components/buttons/Btn/Btn";
import InputPassword from "../../components/inputs/InputPassword/InputPassword";
import InputText from "../../components/inputs/InputText/InputText";
import LinkTo from "../../components/links/LinkTo/LinkTo";
import { HOME } from "../../router/children";
import css from "./css.module.css";

export default function Register() {
  return (
    <div className={css.register}>
      <form className={css.form}>
        <InputText placeholder="Correo" />
        <InputPassword placeholder="Contraseña" />
        <span className={css.wrapper_register}>
          ¿Ya tiene cuenta?<LinkTo to={HOME.to}>Iniciar sesión</LinkTo>
        </span>
        <Btn>Registrarse</Btn>
      </form>
    </div>
  );
}
