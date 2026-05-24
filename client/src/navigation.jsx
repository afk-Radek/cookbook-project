import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-zinc-900 text-white px-6 py-4">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold">
          Cookbook
        </Link>

        <Link to="/" className="hover:text-orange-300">
          Recepty
        </Link>

        <Link to="/recipe/create" className="hover:text-orange-300">
          Přidat recept
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
