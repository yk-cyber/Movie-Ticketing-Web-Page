import { useParams, useNavigate } from "react-router";
import { movies } from "../data";
import { Clock, Star, MapPin, Calendar, Info } from "lucide-react";
import { useAppContext } from "../context";
import { useState } from "react";

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateBooking, user } = useAppContext();
  
  const movie = movies.find(m => m.id === id);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!movie) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <button onClick={() => navigate("/")} className="text-red-500 hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  // Get unique cinemas and add new locations
  const baseCinemas = Array.from(new Set(movie.showtimes.map(st => st.cinema)));
  const additionalCinemas = ["VisionX Megamall", "VisionX Downtown", "VisionX Central"];
  const cinemas = Array.from(new Set([...baseCinemas, ...additionalCinemas]));
  
  const halls = ["Hall 1", "Hall 2", "Hall 3", "Hall 4", "IMAX Hall"];
  const mockTimes = ["10:30 AM", "1:15 PM", "4:45 PM", "8:00 PM"];

  const handleContinue = () => {
    if (!selectedCinema || !selectedDate || !selectedHall || !selectedTime) return;

    if (!user) {
      navigate("/login");
      return;
    }

    updateBooking({
      movieId: movie.id,
      movieTitle: movie.title,
      poster: movie.poster,
      cinema: selectedCinema,
      hall: selectedHall,
      date: selectedDate,
      time: selectedTime,
      seats: [], // reset seats
      food: [], // reset food
    });

    navigate(`/book/${movie.id}/seats`);
  };

  return (
    <div className="w-full bg-black flex-1">
      {/* Movie Header Info */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={movie.poster} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-30 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end pb-12">
          <div className="flex gap-8 items-end">
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="w-40 md:w-56 rounded-xl shadow-2xl border border-zinc-800"
            />
            <div className="mb-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-zinc-300 text-sm mb-4 font-medium">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-red-500" /> {movie.duration}</span>
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 4.8/5 (2k+ reviews)</span>
                <span className="bg-zinc-800 px-2.5 py-1 rounded text-xs text-zinc-100 border border-zinc-700">{movie.rating}</span>
                <span className="text-zinc-500">{movie.genre}</span>
              </div>
              <p className="text-zinc-400 max-w-2xl leading-relaxed hidden md:block">
                {movie.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          {/* Mobile description */}
          <div className="md:hidden">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Info className="w-5 h-5 text-red-500"/> Synopsis</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
              {movie.description}
            </p>
          </div>

          {/* Showtimes Selection */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-red-500" /> 
              Book Tickets
            </h2>
            
            <div className="space-y-8">
              {/* Date Selection */}
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">Select Date</h3>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-white px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:border-red-500 transition-colors w-full md:w-auto"
                />
              </div>

              {/* Cinema Selection */}
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">Select Cinema</h3>
                <div className="flex flex-wrap gap-3">
                  {cinemas.map((cinema) => (
                    <button
                      key={cinema}
                      onClick={() => { setSelectedCinema(cinema); setSelectedTime(null); setSelectedHall(null); }}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all border ${
                        selectedCinema === cinema 
                          ? 'bg-red-600/10 border-red-500 text-red-400' 
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      {cinema}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hall Selection */}
              {selectedCinema && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">Select Hall</h3>
                  <div className="flex flex-wrap gap-3">
                    {halls.map((hall) => (
                      <button
                        key={hall}
                        onClick={() => setSelectedHall(hall)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all border ${
                          selectedHall === hall 
                            ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/20' 
                            : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800'
                        }`}
                      >
                        {hall}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Time Selection */}
              {selectedCinema && selectedHall && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">Select Time</h3>
                  <div className="flex flex-wrap gap-3">
                    {mockTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all border ${
                          selectedTime === time 
                            ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/20' 
                            : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Summary Placeholder / Action */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-4 border-b border-zinc-800 pb-4">Your Selection</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">Cinema</span>
                <span className="text-white font-medium text-right">{selectedCinema || "Not selected"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">Hall</span>
                <span className="text-white font-medium text-right">{selectedHall || "Not selected"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">Date</span>
                <span className="text-white font-medium text-right">{selectedDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">Time</span>
                <span className="text-white font-medium text-right">{selectedTime || "Not selected"}</span>
              </div>
            </div>

            <button
              onClick={handleContinue}
              disabled={!selectedCinema || !selectedDate || !selectedHall || !selectedTime}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                selectedCinema && selectedDate && selectedHall && selectedTime
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/30'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              Continue to Seat Selection
            </button>
            {!user && selectedCinema && selectedHall && selectedTime && (
              <p className="text-xs text-center text-zinc-500 mt-4">You will be prompted to log in.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
