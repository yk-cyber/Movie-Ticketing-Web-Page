import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppContext } from "../context";
import { TicketType, SelectedSeat } from "../context";
import { Monitor, Info, ArrowRight } from "lucide-react";

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const COLS = 10;

const TICKET_PRICES: Record<TicketType, number> = {
  Adult: 15,
  Child: 10,
  Student: 12,
};

// Generate some mock occupied seats
const generateOccupiedSeats = () => {
  const occupied = new Set<string>();
  const totalOccupied = Math.floor(Math.random() * 20) + 10; // 10 to 30 occupied
  for (let i = 0; i < totalOccupied; i++) {
    const row = ROWS[Math.floor(Math.random() * ROWS.length)];
    const col = Math.floor(Math.random() * COLS) + 1;
    occupied.add(`${row}${col}`);
  }
  return occupied;
};

export const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booking, updateBooking } = useAppContext();
  
  // Memoize occupied seats so they don't change on re-render
  const occupiedSeats = useMemo(() => generateOccupiedSeats(), []);
  
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>(booking.seats || []);

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.has(seatId)) return;
    
    setSelectedSeats(prev => {
      const exists = prev.find(s => s.id === seatId);
      if (exists) {
        return prev.filter(s => s.id !== seatId);
      }
      return [...prev, { id: seatId, type: "Adult", price: TICKET_PRICES["Adult"] }];
    });
  };

  const changeTicketType = (seatId: string, type: TicketType) => {
    setSelectedSeats(prev => 
      prev.map(s => s.id === seatId ? { ...s, type, price: TICKET_PRICES[type] } : s)
    );
  };

  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleContinue = () => {
    updateBooking({ seats: selectedSeats });
    navigate(`/book/${id}/fb`);
  };

  if (!booking.movieId) {
    return <div className="flex-1 flex items-center justify-center p-6"><div className="text-center"><h2 className="text-xl font-bold mb-4">No booking in progress</h2><button onClick={() => navigate("/")} className="text-red-500 hover:underline">Return Home</button></div></div>;
  }

  return (
    <div className="w-full bg-zinc-950 flex-1 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Seat Map */}
        <div className="lg:col-span-2 bg-black border border-zinc-900 rounded-3xl p-8 shadow-2xl overflow-x-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-white">Select Your Seats</h1>
            <p className="text-zinc-500 text-sm flex items-center justify-center gap-2">
              <Monitor className="w-4 h-4 text-zinc-600" />
              {booking.movieTitle} • {booking.cinema} • {booking.time}
            </p>
          </div>

          <div className="min-w-[600px] mb-12">
            {/* Screen Arc */}
            <div className="w-full flex justify-center mb-16 relative">
              <div className="w-3/4 h-12 border-t-4 border-red-600/50 rounded-t-[100%] absolute top-0 blur-[2px]" />
              <div className="w-3/4 h-12 border-t-2 border-red-500 rounded-t-[100%] relative flex justify-center pt-2">
                <span className="text-xs font-bold text-red-500/50 uppercase tracking-[0.3em]">Screen</span>
              </div>
            </div>

            {/* Seat Grid */}
            <div className="flex flex-col gap-4">
              {ROWS.map(row => (
                <div key={row} className="flex justify-center items-center gap-2 md:gap-4">
                  <div className="w-6 text-center text-sm font-bold text-zinc-600 mr-2">{row}</div>
                  <div className="flex gap-2">
                    {Array.from({ length: COLS }, (_, i) => {
                      const seatId = `${row}${i + 1}`;
                      const isOccupied = occupiedSeats.has(seatId);
                      const isSelected = selectedSeats.some(s => s.id === seatId);

                      // Add aisle space after column 3 and 7
                      const isAisle = i === 2 || i === 6;

                      return (
                        <div key={seatId} className={`flex items-center ${isAisle ? 'mr-4 md:mr-8' : ''}`}>
                          <button
                            disabled={isOccupied}
                            onClick={() => toggleSeat(seatId)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-t-lg rounded-b flex items-center justify-center text-xs font-bold transition-all ${
                              isOccupied 
                                ? 'bg-zinc-800 text-zinc-900 cursor-not-allowed border border-zinc-800' 
                                : isSelected 
                                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/30 transform scale-110 border-b-4 border-red-800' 
                                  : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-700 hover:text-white border-b-2 border-zinc-800'
                            }`}
                            aria-label={`Seat ${seatId}`}
                          >
                            {isSelected ? '✓' : i + 1}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-6 text-center text-sm font-bold text-zinc-600 ml-2">{row}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-8 text-sm pt-8 border-t border-zinc-900">
            <div className="flex items-center gap-2 text-zinc-400">
              <div className="w-6 h-6 rounded-t bg-zinc-900 border-b-2 border-zinc-800" /> Available
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <div className="w-6 h-6 rounded-t bg-red-600 border-b-4 border-red-800" /> Selected
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <div className="w-6 h-6 rounded-t bg-zinc-800 border border-zinc-800" /> Occupied
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-24 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4 text-white">
              Ticket Details
            </h3>
            
            {selectedSeats.length === 0 ? (
              <div className="text-center py-8 text-zinc-500">
                <Info className="w-8 h-8 mx-auto mb-3 text-zinc-600" />
                <p className="text-sm">Please select seats from the map to continue.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="bg-black/50 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-lg">Seat {seat.id}</span>
                        <span className="font-bold text-red-400">MYR {seat.price.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2 bg-zinc-950 p-1 rounded-lg border border-zinc-900">
                        {["Adult", "Child", "Student"].map((type) => (
                          <button
                            key={type}
                            onClick={() => changeTicketType(seat.id, type as TicketType)}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${
                              seat.type === type 
                                ? 'bg-zinc-800 text-white shadow' 
                                : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-800 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-zinc-400 font-medium">Total Price</span>
                    <span className="text-2xl font-bold text-white">MYR {total.toFixed(2)}</span>
                  </div>
                  
                  <button
                    onClick={handleContinue}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/30 transition-all flex items-center justify-center gap-2 group"
                  >
                    Add F&B <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => {
                      updateBooking({ seats: selectedSeats, food: [] });
                      navigate("/checkout");
                    }}
                    className="w-full py-3 mt-3 rounded-xl font-bold text-sm bg-transparent border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-300 transition-all"
                  >
                    Skip to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
