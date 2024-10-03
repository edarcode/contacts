import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useInitApp } from "./useInitApp";

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
