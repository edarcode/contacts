import Btn from "../../components/buttons/Btn/Btn";
import InputPassword from "../../components/inputs/InputPassword/InputPassword";
import InputText from "../../components/inputs/InputText/InputText";
import css from "./css.module.css";

export default function Home() {
  return (
    <div className={css.home}>
      <form className={css.login}>
        <InputText placeholder="Correo" />
        <InputPassword placeholder="Contraseña" />
        <Btn>Iniciar sesión</Btn>
      </form>
    </div>
  );
}
