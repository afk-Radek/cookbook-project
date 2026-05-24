import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="mx-auto max-w-4xl py-20 text-center">
      <h1 className="text-5xl font-bold text-zinc-900">Cookbook</h1>

      <p className="mt-4 text-lg text-zinc-600">
        Správa receptů a kategorií na jednom místě.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/recipe"
          className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600"
        >
          Zobrazit recepty
        </Link>

        <Link
          to="/recipeCategory"
          className="rounded-xl border border-orange-500 px-6 py-3 font-medium text-orange-600 hover:bg-orange-50"
        >
          Kategorie
        </Link>
      </div>
    </div>
  );
}

export default Home;
