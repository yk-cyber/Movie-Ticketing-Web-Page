import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black text-white">
      <h2 className="text-4xl font-bold mb-4 text-red-500">404</h2>
      <p className="text-xl mb-8">Page not found</p>
      <Link to="/" className="text-red-500 hover:text-red-400 font-medium transition-colors border border-red-500 rounded-full px-6 py-2">Return Home</Link>
    </div>
  );
};
