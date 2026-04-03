import { useNavigate } from "react-router";
import { useAppContext } from "../context";
import { Film, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

export const BookingSummary = () => {
  const navigate = useNavigate();
  const { booking } = useAppContext();

  if (!booking.movieId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black text-white">
        <h2 className="text-2xl font-bold mb-4">No booking in progress</h2>
        <button onClick={() => navigate("/")} className="text-red-500 hover:text-red-400 font-medium">Return Home</button>
      </div>
    );
  }

  const totalSeats = booking.seats.reduce((sum, seat) => sum + seat.price, 0);
  const totalFood = (booking.food || []).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = (totalSeats + totalFood) * 0.08;
  const grandTotal = totalSeats + totalFood + tax;

  return (
    <div className="w-full bg-black min-h-screen py-12 flex flex-col items-center">
      <div className="w-full max-w-4xl px-6 animate-in fade-in zoom-in-95 duration-500">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-4xl font-bold text-white mb-8 tracking-tighter">Booking Summary</h1>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <img src={booking.poster} alt={booking.movieTitle} className="w-32 md:w-48 rounded-2xl shadow-xl border border-zinc-800" />
            <div className="flex-1 flex flex-col justify-center">
              <span className="bg-red-600/20 text-red-500 border border-red-600/30 text-xs font-bold tracking-wider px-3 py-1 rounded-full mb-4 w-fit inline-block">CONFIRMATION CHECK</span>
              <h2 className="font-bold text-3xl md:text-4xl text-white mb-2">{booking.movieTitle}</h2>
              <p className="text-lg text-zinc-400 mb-1">{booking.cinema}</p>
              <p className="text-lg text-white font-medium">{booking.date} • {booking.time}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">Ticket Details <span className="bg-zinc-800 text-xs py-0.5 px-2 rounded-md">{booking.seats.length}</span></h3>
                <div className="space-y-3">
                  {booking.seats.map(seat => (
                    <div key={seat.id} className="flex justify-between items-center text-zinc-300 pb-3 border-b border-zinc-800/50">
                      <span>Seat {seat.id} <span className="text-zinc-600 text-sm ml-2">({seat.type})</span></span>
                      <span className="font-medium">MYR {seat.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {(booking.food || []).length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">Food & Beverage <span className="bg-zinc-800 text-xs py-0.5 px-2 rounded-md">{(booking.food || []).length}</span></h3>
                  <div className="space-y-3">
                    {(booking.food || []).map(item => (
                      <div key={item.id} className="flex justify-between items-center text-zinc-300 pb-3 border-b border-zinc-800/50">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="font-medium">MYR {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-black/50 rounded-2xl p-6 border border-zinc-800 h-fit">
              <h3 className="font-bold text-xl text-white mb-6 border-b border-zinc-800 pb-4">Payment Computation</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-zinc-400">
                  <span>Tickets Subtotal</span>
                  <span>MYR {totalSeats.toFixed(2)}</span>
                </div>
                {(booking.food || []).length > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>F&B Subtotal</span>
                    <span>MYR {totalFood.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Taxes & Fees (8%)</span>
                  <span>MYR {tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-zinc-800 pt-6 mb-8">
                <span className="text-lg font-bold text-white">Grand Total</span>
                <span className="text-4xl font-bold text-red-500">MYR {grandTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-4 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/30 transition-all flex items-center justify-center gap-2 text-lg"
              >
                Proceed to Payment <ArrowRight className="w-5 h-5" />
              </button>
              
              <p className="text-center text-xs text-zinc-600 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-500" /> Verify your items before payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
