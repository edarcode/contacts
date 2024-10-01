import { createBrowserRouter } from "react-router-dom";
import { HOME } from "./children.js";
import App from "../App/App.js";
import NotFound404 from "../pages/NotFound404/NotFound404.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound404 />,
    children: [HOME],
  },
]);
