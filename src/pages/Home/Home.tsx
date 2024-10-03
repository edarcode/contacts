import { useNavigate } from "react-router-dom";
import Btn from "../../components/buttons/Btn/Btn";
import css from "./css.module.css";
import { REGISTER } from "../../router/children";

export default function Home() {
  const navigate = useNavigate();
  return (
    <section className={css.home}>
      <div className={css.about}>
        <h1>Gestor de Contactos Personal</h1>
        <p>
          Esta aplicación está diseñada para ayudar a las personas a gestionar
          sus contactos de manera eficiente. Permite agregar, listar, editar y
          eliminar contactos de forma sencilla y rápida. Con una interfaz
          intuitiva, ideal para aquellos que buscan mantener su agenda siempre
          actualizada. Esta herramienta te permitirá organizar tu red de
          contactos de manera eficaz y accesible desde cualquier lugar.
        </p>
        <Btn onClick={() => navigate(REGISTER.to)}>Empezar</Btn>
      </div>
    </section>
  );
}
