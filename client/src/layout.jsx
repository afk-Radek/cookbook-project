import { Outlet } from "react-router-dom";
import Navigation from "./navigation";

function Layout() {
  return (
    <div className="min-h-screen bg-orange-50">
      <Navigation />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
