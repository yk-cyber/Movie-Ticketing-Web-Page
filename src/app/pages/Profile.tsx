import { useState } from "react";
import { useAppContext } from "../context";
import { Clock, Star, MapPin, Search, X } from "lucide-react";
import { Link } from "react-router";

export const Profile = () => {
  const { user, pastBookings, reviews, addReview } = useAppContext();
  const [activeTab, setActiveTab] = useState<"history" | "reviews">("history");

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewMovie, setReviewMovie] = useState<{ id: string; title: string } | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const handleOpenReview = (movieId: string, title: string) => {
    setReviewMovie({ id: movieId, title });
    setRating(5);
    setReviewText("");
    setReviewModalOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewMovie) {
      addReview({
        movieId: reviewMovie.id,
        movieTitle: reviewMovie.title,
        rating,
        text: reviewText,
        date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
      });
      setReviewModalOpen(false);
      setActiveTab("reviews");
    }
  };

  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black text-white">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your profile.</h2>
        <Link to="/login" className="text-red-500 hover:text-red-400 font-medium transition-colors">Log In</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-black flex-1 py-12">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-12 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-red-900/30 ring-4 ring-zinc-950">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            <p className="text-zinc-400">{user.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-zinc-800 mb-8 pb-4">
          <button
            onClick={() => setActiveTab("history")}
            className={`text-lg font-bold transition-colors pb-4 -mb-4 border-b-2 ${
              activeTab === "history" 
                ? 'text-white border-red-500' 
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            Booking History
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`text-lg font-bold transition-colors pb-4 -mb-4 border-b-2 ${
              activeTab === "reviews" 
                ? 'text-white border-red-500' 
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            My Reviews
          </button>
        </div>

        {/* Content */}
        {activeTab === "history" && (
          <div className="space-y-6">
            {pastBookings.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-3xl">
                <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-300 mb-2">No bookings yet</h3>
                <p className="text-zinc-500 mb-6">Book your first movie ticket and see it here.</p>
                <Link to="/" className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-colors shadow-lg shadow-red-900/20">Browse Movies</Link>
              </div>
            ) : (
              pastBookings.map((booking, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors group">
                  <img src={booking.poster} alt={booking.movieTitle} className="w-24 md:w-32 rounded-xl shadow-md border border-zinc-800 object-cover group-hover:scale-105 transition-transform" />
                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{booking.movieTitle}</h3>
                      <p className="text-zinc-400 flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-red-500" /> {booking.cinema}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/40 p-4 rounded-xl border border-zinc-800">
                      <div>
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Date</p>
                        <p className="text-white font-medium text-sm">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Time</p>
                        <p className="text-white font-medium text-sm">{booking.time}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Seats</p>
                        <p className="text-white font-medium text-sm">{booking.seats.map(s => s.id).join(", ")}</p>
                      </div>
                      <div className="md:col-span-1">
                        <button 
                          onClick={() => handleOpenReview(booking.movieId!, booking.movieTitle)}
                          className="w-full h-full min-h-[40px] flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-bold transition-colors"
                        >
                          <Star className="w-4 h-4" /> Rate Movie
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-3xl">
                <Star className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-300 mb-2">No reviews yet</h3>
                <p className="text-zinc-500">Rate movies after watching them to build your profile.</p>
              </div>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{review.movieTitle}</h3>
                      <p className="text-zinc-500 text-sm">{review.date}</p>
                    </div>
                    <div className="flex bg-black/40 px-3 py-1.5 rounded-lg border border-zinc-800">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-700'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">{review.text}</p>
                </div>
              ))
            )}
          </div>
        )}

        {reviewModalOpen && reviewMovie && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setReviewModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors bg-zinc-800 p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-2">Rate Movie</h2>
              <p className="text-zinc-400 mb-8">What did you think of <span className="text-white font-medium">{reviewMovie.title}</span>?</p>
              
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-3">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star className={`w-8 h-8 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-3" htmlFor="review">Your Review (Optional)</label>
                  <textarea
                    id="review"
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your thoughts about the movie..."
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-900/30 text-lg mt-4"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
