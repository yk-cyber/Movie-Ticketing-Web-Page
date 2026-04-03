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
  const [error, setError] = useState("");

  const totalSeats = booking.seats.reduce((sum, seat) => sum + seat.price, 0);
  const totalFood = booking.food.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = (totalSeats + totalFood) * 0.08; // 8% tax
  const grandTotal = totalSeats + totalFood + tax;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (method === "card") {
      if (!name.trim()) {
        setError("Please enter the name exactly as it appears on your card.");
        return;
      }
      
      const cleanCardNumber = cardNumber.replace(/\s+/g, "");
      if (!/^\d{16}$/.test(cleanCardNumber)) {
        setError("Please enter a valid 16-digit card number.");
        return;
      }
      
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        setError("Please enter a valid expiry date in MM/YY format.");
        return;
      }
      
      const [month, year] = expiry.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const currentDate = new Date();
      currentDate.setDate(1); // Set to start of month to compare just month/year
      currentDate.setHours(0, 0, 0, 0);
      
      if (expiryDate < currentDate) {
         setError("This card has expired.");
         return;
      }

      if (!/^\d{3,4}$/.test(cvv)) {
        setError("Please enter a valid 3 or 4 digit CVV.");
        return;
      }
    }
    
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      confirmBooking();
      navigate("/confirmation");
    }, 2000);
  };

  let nameError = "";
  if (name.length > 0 && name.trim().length === 0) nameError = "Name cannot be empty";

  let cardError = "";
  const cleanCard = cardNumber.replace(/\s+/g, "");
  if (cleanCard.length > 0 && cleanCard.length < 16) {
     cardError = "16 digits required";
  }

  let expiryError = "";
  if (expiry.length === 5) {
      const [month, year] = expiry.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const currentDate = new Date();
      currentDate.setDate(1); 
      currentDate.setHours(0, 0, 0, 0);
      if (expiryDate < currentDate) expiryError = "Expired";
      else if (parseInt(month) < 1 || parseInt(month) > 12) expiryError = "Invalid month";
  } else if (expiry.length > 0 && expiry.length < 5) {
      expiryError = "Incomplete";
  }

  let cvvError = "";
  if (cvv.length > 0 && cvv.length < 3) {
      cvvError = "Min 3 digits";
  }

  if (!booking.movieId) {
    return <div className="flex-1 flex items-center justify-center p-6"><div className="text-center"><h2 className="text-xl font-bold mb-4">No booking in progress</h2><button onClick={() => navigate("/")} className="text-red-500 hover:underline">Return Home</button></div></div>;
  }

  return (
    <div className="w-full bg-black flex-1 py-12">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Payment Form */}
        <div className="w-full">
          <button onClick={() => navigate("/summary")} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Summary
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

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm text-center font-medium animate-in fade-in">
                {error}
              </div>
            )}

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
                        className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-all placeholder-zinc-700 ${nameError ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600"}`}
                        placeholder="John Doe"
                        required
                      />
                      {nameError && <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1 animate-in fade-in">{nameError}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                          <input 
                          type="text" 
                          value={cardNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").substring(0, 16);
                            const formatted = val.replace(/(\d{4})(?=\d)/g, "$1 ");
                            setCardNumber(formatted);
                          }}
                          pattern="^(\d{4}\s){3}\d{4}$"
                          title="Please enter a valid 16-digit card number"
                          className={`w-full bg-black border rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none transition-all placeholder-zinc-700 font-mono tracking-widest ${cardError ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600"}`}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          required
                        />
                      </div>
                      {cardError && <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1 animate-in fade-in">{cardError}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Expiry Date</label>
                        <input 
                          type="text" 
                          value={expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "").substring(0, 4);
                            if (val.length >= 3) {
                              val = val.substring(0, 2) + '/' + val.substring(2, 4);
                            }
                            setExpiry(val);
                          }}
                          pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                          title="Please enter a valid expiry date in MM/YY format"
                          className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-all placeholder-zinc-700 font-mono text-center ${expiryError ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600"}`}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                        {expiryError && <p className="text-red-500 text-xs font-semibold mt-1.5 mx-auto animate-in fade-in">{expiryError}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">CVV</label>
                        <input 
                          type="password" 
                          value={cvv}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").substring(0, 4);
                            setCvv(val);
                          }}
                          pattern="^\d{3,4}$"
                          title="Please enter a valid 3 or 4 digit CVV"
                          className={`w-full bg-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-all placeholder-zinc-700 font-mono text-center tracking-widest ${cvvError ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600"}`}
                          placeholder="***"
                          maxLength={4}
                          required
                        />
                        {cvvError && <p className="text-red-500 text-xs font-semibold mt-1.5 mx-auto animate-in fade-in">{cvvError}</p>}
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
                  <div className="bg-white p-3 inline-block rounded-xl mb-4 shadow-[0_0_20px_rgba(0,74,153,0.3)]">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=visionx-payment-${grandTotal}&color=000000`} 
                      alt="Touch 'n Go QR Code" 
                      className="w-32 h-32"
                    />
                  </div>
                  <p className="font-medium text-white mb-2">Touch 'n Go eWallet</p>
                  <p className="text-sm text-zinc-400">Open your Touch 'n Go eWallet app and scan the QR code to proceed with payment.</p>
                  <div className="mt-4 inline-flex items-center justify-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/5">
                    <span className="text-zinc-400 text-sm">Amount:</span>
                    <span className="text-white font-bold">MYR {grandTotal.toFixed(2)}</span>
                  </div>
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
      </div>
    </div>
  );
};
