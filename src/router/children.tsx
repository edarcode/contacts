import Contacts from "../pages/Contacts/Contacts";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";

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

export const CONTACTS = {
  id: crypto.randomUUID(),
  path: "contacts",
  to: "/contacts",
  display: "Contactos",
  element: <Contacts />,
};
