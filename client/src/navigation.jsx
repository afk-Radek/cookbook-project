import { Link, useLocation } from "react-router-dom";
import logo from "./assets/logo.png";
function Navigation() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/">
          <img src={logo} alt="Cookbook" className="h-12 w-auto" />
        </Link>

        {!isHomePage && (
          <div className="flex items-center gap-6">
            <Link to="/recipe" className="text-zinc-700 hover:text-orange-600">
              Seznam receptů
            </Link>

            <Link
              to="/recipeCategory"
              className="text-zinc-700 hover:text-orange-600"
            >
              Seznam kuchařek
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
