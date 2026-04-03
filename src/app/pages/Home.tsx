import { Link, useLocation, useNavigate } from "react-router";
import { movies } from "../data";
import { PlayCircle, Star, Clock, SearchX } from "lucide-react";
import { useState } from "react";

export const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Action");
  const location = useLocation();
  const navigate = useNavigate();
  
  const categories = ["Action", "Romance", "Sci-Fi", "Drama", "Comedy", "Thriller", "All"];
  
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const filteredMovies = movies.filter(movie => {
    const matchesFilter = selectedFilter === "All" || movie.genre.includes(selectedFilter);
    const matchesSearch = searchQuery === "" || 
      movie.title.toLowerCase().includes(searchQuery) || 
      movie.genre.toLowerCase().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full bg-black">
      {/* Hero Section */}
      <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={movies[0].poster} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-40 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-12">
          <img 
            src={movies[0].poster} 
            alt={movies[0].title} 
            className="w-64 md:w-80 rounded-2xl shadow-2xl shadow-red-900/20 hidden md:block"
          />
          <div className="text-white max-w-2xl">
            <span className="bg-red-600 text-xs font-bold tracking-wider px-3 py-1 rounded-full mb-4 inline-block">NOW SHOWING</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">{movies[0].title}</h1>
            <div className="flex items-center gap-4 text-zinc-300 text-sm mb-6 font-medium">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {movies[0].duration}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 4.8/5</span>
              <span className="bg-zinc-800 px-2 py-0.5 rounded text-xs text-zinc-100 border border-zinc-700">{movies[0].rating}</span>
            </div>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              {movies[0].description}
            </p>
            <div className="flex gap-4">
              <Link to={`/movie/${movies[0].id}`} className="bg-white hover:bg-zinc-200 text-black px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2">
                Book Tickets
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Movies List */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Trending Now"}
            </h2>
            <p className="text-zinc-500">
              {searchQuery ? `Found ${filteredMovies.length} movies` : "Book tickets for the hottest movies in town."}
            </p>
          </div>
          
          {!searchQuery && (
            <div className="hidden md:flex gap-2">
              {categories.map((filter) => {
                if (filter === "All") {
                  return (
                    <button 
                      key={filter} 
                      onClick={() => navigate("/movies")}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800`}
                    >
                      {filter} →
                    </button>
                  );
                }
                return (
                  <button 
                    key={filter} 
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === selectedFilter ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                  >
                    {filter}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {filteredMovies.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-3xl">
            <SearchX className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-zinc-300 mb-2">No movies found</h3>
            <p className="text-zinc-500 mb-6">We couldn't find any movies matching "{searchQuery}".</p>
            <Link to="/" className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-colors">Clear Search</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredMovies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="group">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-4 bg-zinc-900">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Get Tickets
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-md text-zinc-200 border border-white/10">
                    {movie.rating}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors line-clamp-1">{movie.title}</h3>
                <p className="text-zinc-500 text-sm">{movie.genre}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};