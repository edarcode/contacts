import Account from "../pages/Account/Account";
import Contacts from "../pages/Contacts/Contacts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import RouteProtector from "./RouterProtector";

export const HOME = {
  id: crypto.randomUUID(),
  path: "",
  to: "/",
  display: "Inicio",
  element: <Home />,
};

export const REGISTER = {
  id: crypto.randomUUID(),
  path: "registro",
  to: "/registro",
  display: "Registro",
  element: <Register />,
};

export const LOGIN = {
  id: crypto.randomUUID(),
  path: "login",
  to: "/login",
  display: "Login",
  element: <Login />,
};

export const CONTACTS = {
  id: crypto.randomUUID(),
  path: "contactos",
  to: "/contactos",
  display: "Contactos",
  element: (
    <RouteProtector>
      <Contacts />
    </RouteProtector>
  ),
};

export const ACCOUNT = {
  id: crypto.randomUUID(),
  path: "cuenta",
  to: "/cuenta",
  display: "Cuenta",
  element: (
    <RouteProtector>
      <Account />
    </RouteProtector>
  ),
};
