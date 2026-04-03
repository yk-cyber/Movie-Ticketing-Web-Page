import { Link, useLocation, useNavigate } from "react-router";
import { movies } from "../data";
import { SearchX, Film } from "lucide-react";
import { useState } from "react";

export const AllMovies = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const location = useLocation();
  const navigate = useNavigate();
  
  const categories = ["All", "Action", "Romance", "Sci-Fi", "Drama", "Comedy", "Thriller"];
  
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
    <div className="w-full bg-black min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-6">
          <Film className="w-8 h-8 text-red-600" />
          <h1 className="text-4xl font-bold tracking-tight text-white">All Movies</h1>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-zinc-500">
              {searchQuery ? `Found ${filteredMovies.length} movies for "${searchQuery}"` : "Browse our complete catalog."}
            </p>
          </div>
          
          {!searchQuery && (
            <div className="flex flex-wrap gap-2">
              {categories.map((filter) => (
                <button 
                  key={filter} 
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === selectedFilter ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredMovies.length === 0 ? (
           <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-3xl">
             <SearchX className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-zinc-300 mb-2">No movies found</h3>
             <p className="text-zinc-500 mb-6">We couldn't find any movies matching "{searchQuery}".</p>
             <button onClick={() => navigate("/movies")} className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-colors">Clear Search</button>
           </div>
         ) : (
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
      </div>
    </div>
  );
};
