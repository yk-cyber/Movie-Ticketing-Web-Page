import { Link, useNavigate, useLocation } from "react-router";
import { Film, User, Search, ShoppingBag, LogOut } from "lucide-react";
import { useAppContext } from "../context";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("q") || "");
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter hover:text-red-500 transition-colors">
            <Film className="w-8 h-8 text-red-600" />
            <span>VisionX Cinema</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 hover:text-red-400 text-sm font-medium">
                  <User className="w-5 h-5" />
                </Link>
                <button onClick={() => { logout(); navigate("/"); }} className="hover:text-red-400 transition-colors" aria-label="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>

        <form onSubmit={handleSearch} className="w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, cinemas, or genres..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-white placeholder-zinc-500"
          />
        </form>
      </div>
    </nav>
  );
};
