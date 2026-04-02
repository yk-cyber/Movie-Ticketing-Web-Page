import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context";
import { CreditCard, Wallet, Film, ArrowLeft, Smartphone } from "lucide-react";

export const Checkout = () => {
  const navigate = useNavigate();
  const { booking, confirmBooking } = useAppContext();
  
  const [method, setMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);

  const totalSeats = booking.seats.reduce((sum, seat) => sum + seat.price, 0);
  const totalFood = booking.food.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = (totalSeats + totalFood) * 0.08; // 8% tax
  const grandTotal = totalSeats + totalFood + tax;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "card" && (!cardNumber || !expiry || !cvv || !name)) {
      alert("Please fill all card details");
      return;
    }
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      confirmBooking();
      navigate("/confirmation");
    }, 2000);
  };

  if (!booking.movieId) {
    return <div className="flex-1 flex items-center justify-center p-6"><div className="text-center"><h2 className="text-xl font-bold mb-4">No booking in progress</h2><button onClick={() => navigate("/")} className="text-red-500 hover:underline">Return Home</button></div></div>;
  }

  return (
    <div className="w-full bg-black flex-1 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Payment Form */}
        <div className="lg:col-span-1">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </button>
          
          <h2 className="text-3xl font-bold text-white mb-8">Secure Checkout</h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-lg font-bold mb-6 text-zinc-300 border-b border-zinc-800 pb-4">Payment Method</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setMethod("card")}
                className={`py-4 rounded-xl font-bold transition-all border flex flex-col items-center justify-center gap-2 ${
                  method === "card" 
                    ? 'bg-red-600/10 border-red-500 text-red-400 shadow-inner' 
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                }`}
              >
                <CreditCard className="w-6 h-6" /> Credit/Debit Card
              </button>
              <button
                type="button"
                onClick={() => setMethod("wallet")}
                className={`py-4 rounded-xl font-bold transition-all border flex flex-col items-center justify-center gap-2 ${
                  method === "wallet" 
                    ? 'bg-red-600/10 border-red-500 text-red-400 shadow-inner' 
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                }`}
              >
                <Wallet className="w-6 h-6" /> Digital Wallet
              </button>
              <button
                type="button"
                onClick={() => setMethod("tng")}
                className={`py-4 rounded-xl font-bold transition-all border flex flex-col items-center justify-center gap-2 ${
                  method === "tng" 
                    ? 'bg-red-600/10 border-red-500 text-red-400 shadow-inner' 
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                }`}
              >
                <Smartphone className="w-6 h-6" /> Touch 'n Go
              </button>
            </div>

            <form onSubmit={handlePay} className="space-y-6">
              {method === "card" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 flex flex-col md:flex-row gap-6 items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1707483618687-488503f1523c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVkaXQlMjBjYXJkJTIwbW9ja3VwfGVufDF8fHx8MTc3NDk1MjEzNXww&ixlib=rb-4.1.0&q=80&w=1080" 
                      alt="Credit card example" 
                      className="w-48 h-auto rounded-xl shadow-lg border border-zinc-700/50"
                    />
                    <div className="text-sm text-zinc-400 space-y-2">
                      <p><strong className="text-white">Card Number:</strong> 16 digits on the front</p>
                      <p><strong className="text-white">Expiry Date:</strong> MM/YY format on the front</p>
                      <p><strong className="text-white">CVV:</strong> 3-digit security code on the back</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Name on Card</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder-zinc-700"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                        <input 
                          type="text" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder-zinc-700 font-mono tracking-widest"
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Expiry Date</label>
                        <input 
                          type="text" 
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder-zinc-700 font-mono text-center"
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">CVV</label>
                        <input 
                          type="password" 
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder-zinc-700 font-mono text-center tracking-widest"
                          placeholder="***"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {method === "wallet" && (
                <div className="animate-in fade-in zoom-in duration-300 bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center text-zinc-400">
                  <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>You will be redirected to your digital wallet app to authorize the payment.</p>
                </div>
              )}

              {method === "tng" && (
                <div className="animate-in fade-in zoom-in duration-300 bg-[#004a99]/10 border border-[#004a99]/30 rounded-xl p-8 text-center text-zinc-300">
                  <Smartphone className="w-12 h-12 mx-auto mb-4 text-[#004a99]" />
                  <p className="font-medium text-white mb-2">Touch 'n Go eWallet</p>
                  <p className="text-sm text-zinc-400">Open your Touch 'n Go eWallet app and scan the QR code to proceed with payment.</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={processing}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-3 text-lg mt-8"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay MYR ${grandTotal.toFixed(2)}`
                )}
              </button>
              <p className="text-xs text-center text-zinc-600 flex items-center justify-center gap-1 mt-4">
                <span className="w-3 h-3 bg-green-500 rounded-full inline-block animate-pulse"></span>
                Secure connection via 256-bit SSL encryption.
              </p>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-24 shadow-2xl">
            <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-3 border-b border-zinc-800 pb-6">
              <Film className="w-6 h-6 text-red-500" /> Booking Summary
            </h3>
            
            <div className="flex gap-6 mb-8 bg-black/40 p-4 rounded-2xl border border-zinc-800/50">
              <img src={booking.poster} alt={booking.movieTitle} className="w-24 rounded-lg shadow-md" />
              <div>
                <h4 className="font-bold text-lg text-white mb-2">{booking.movieTitle}</h4>
                <p className="text-sm text-zinc-400 mb-1">{booking.cinema}</p>
                <p className="text-sm text-zinc-400">{booking.date} • {booking.time}</p>
              </div>
            </div>

            <div className="space-y-6 text-sm">
              <div className="border-b border-zinc-800 pb-6 space-y-4">
                <h5 className="font-bold text-zinc-500 uppercase tracking-wider mb-4">Tickets</h5>
                {booking.seats.map(seat => (
                  <div key={seat.id} className="flex justify-between text-zinc-300">
                    <span>Seat {seat.id} ({seat.type})</span>
                    <span>MYR {seat.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {booking.food.length > 0 && (
                <div className="border-b border-zinc-800 pb-6 space-y-4">
                  <h5 className="font-bold text-zinc-500 uppercase tracking-wider mb-4">Food & Beverage</h5>
                  {booking.food.map(item => (
                    <div key={item.id} className="flex justify-between text-zinc-300">
                      <span>{item.quantity}x {item.name}</span>
                      <span>MYR {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 space-y-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>MYR {(totalSeats + totalFood).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Taxes & Fees (8%)</span>
                  <span>MYR {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-6 mt-6 border-t border-zinc-800">
                  <span className="text-lg font-bold text-white">Total Amount</span>
                  <span className="text-3xl font-bold text-red-500">MYR {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
