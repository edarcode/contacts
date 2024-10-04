import { Outlet } from "react-router-dom";
import { useInitApp } from "./useInitApp";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";

export default function App() {
  const { loading } = useInitApp();

  if (loading) return null;
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
