import { Link } from "react-router";
import { CheckCircle, Download, Home } from "lucide-react";
import { useAppContext } from "../context";

export const Confirmation = () => {
  const { pastBookings } = useAppContext();
  const latestBooking = pastBookings[0];

  if (!latestBooking) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black text-white">
        <h2 className="text-2xl font-bold mb-4">No recent bookings found.</h2>
        <Link to="/" className="text-red-500 hover:text-red-400 font-medium transition-colors">Return Home</Link>
      </div>
    );
  }

  const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase();

  const handleDownload = () => {
    const ticketDetails = `VISIONX CINEMA - E-TICKET
-------------------------------------
Booking ID   : ${bookingId}
Movie        : ${latestBooking.movieTitle}
Cinema       : ${latestBooking.cinema}
Hall         : ${latestBooking.hall}
Date         : ${latestBooking.date}
Time         : ${latestBooking.time}
Seats        : ${latestBooking.seats.map(s => s.id).join(", ")}
-------------------------------------
Thank you for choosing VisionX Cinema!`;

    const element = document.createElement("a");
    const file = new Blob([ticketDetails], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `VisionX_Ticket_${bookingId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex-1 bg-black py-16 px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-red-900" />
        <div className="absolute top-1/2 left-0 w-4 h-8 bg-black rounded-r-full -translate-y-1/2 border-r border-t border-b border-zinc-800" />
        <div className="absolute top-1/2 right-0 w-4 h-8 bg-black rounded-l-full -translate-y-1/2 border-l border-t border-b border-zinc-800" />

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <CheckCircle className="w-10 h-10 text-green-500 relative z-10" />
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-zinc-400">Your tickets have been sent to your email.</p>
        </div>

        <div className="border-t border-b border-zinc-800 border-dashed py-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img src={latestBooking.poster} alt={latestBooking.movieTitle} className="w-32 rounded-xl shadow-lg border border-zinc-800" />

            <div className="flex-1 space-y-4 w-full">
              <div>
                <h3 className="text-2xl font-bold text-white">{latestBooking.movieTitle}</h3>
                <p className="text-zinc-400">{latestBooking.cinema} • {latestBooking.hall}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-white font-medium">{latestBooking.date}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Time</p>
                  <p className="text-white font-medium">{latestBooking.time}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Seats</p>
                  <p className="text-white font-medium">{latestBooking.seats.map(s => s.id).join(", ")}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Booking ID</p>
                  <p className="text-white font-mono font-bold tracking-widest">{bookingId}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-colors"
          >
            <Download className="w-5 h-5" /> Download E-Ticket
          </button>
          <Link to="/" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-900/30">
            <Home className="w-5 h-5" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
