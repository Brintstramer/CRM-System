import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation/MainNavigation";

const AppLayout = () => {
  return (
    <div style={{ height: "100vh", display: "grid", gridTemplateColumns: "10% 90%" }}>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
