import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context";
import { foodItems } from "../data";
import { Coffee, Minus, Plus, ShoppingBag } from "lucide-react";

export const FoodAndBeverage = () => {
  const navigate = useNavigate();
  const { booking, updateBooking } = useAppContext();

  const [cart, setCart] = useState(booking.food || []);
  const [selectedCategory, setSelectedCategory] = useState("Combos");
  const categories = ["View All"];

  const addToCart = (item: typeof foodItems[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== itemId);
    });
  };

  const totalFood = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSeats = booking.seats?.reduce((sum, seat) => sum + seat.price, 0) || 0;

  const handleContinue = () => {
    updateBooking({ food: cart });
    navigate("/summary");
  };

  const displayedItems = foodItems.filter(i => i.category === selectedCategory);

  if (!booking.movieId) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">No booking in progress</h2>
          <button onClick={() => navigate("/")} className="text-red-500 hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black flex-1 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white flex items-center justify-center gap-3">
            <Coffee className="w-8 h-8 text-red-500" /> Grab a Snack
          </h1>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Enhance your movie experience with our freshly prepared popcorn and refreshing beverages. Skip the queue by ordering now!
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex gap-2">
            {categories.map((filter) => {
              if (filter === "View All") {
                return (
                  <button
                    key={filter}
                    onClick={() => navigate("/fb-all")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800`}
                  >
                    {filter} →
                  </button>
                );
              }
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedCategory(filter)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === selectedCategory ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {displayedItems.length === 0 ? (
              <div className="col-span-1 md:col-span-2 text-center py-20 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-3xl">
                <Coffee className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-300 mb-2">No items found</h3>
                <p className="text-zinc-500 mb-6">No {selectedCategory} available at this time.</p>
              </div>
            ) : (
              displayedItems.map(item => {
                const cartItem = cart.find(i => i.id === item.id);
                return (
                  <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl group hover:border-zinc-700 transition-all">
                    <div className="h-48 relative overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80" />
                      <div className="absolute top-3 right-3 text-xs font-bold px-2 py-1 bg-black/60 text-white rounded-md backdrop-blur-sm shadow">
                        {item.category}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <h3 className="font-bold text-xl text-white drop-shadow-md">{item.name}</h3>
                        <span className="bg-red-600 text-white font-bold px-3 py-1 rounded-full shadow-lg">MYR {item.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-zinc-400 text-sm mb-6 h-10">{item.description}</p>

                      {cartItem ? (
                        <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl p-2">
                          <button onClick={() => removeFromCart(item.id)} className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-lg text-white w-12 text-center">{cartItem.quantity}</span>
                          <button onClick={() => addToCart(item)} className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-green-600 text-white flex items-center justify-center transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item)} className="w-full py-3.5 rounded-xl font-bold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors flex items-center justify-center gap-2">
                          <ShoppingBag className="w-4 h-4" /> Add to Order
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-24 shadow-2xl">
              <h3 className="text-xl font-bold mb-6 border-b border-zinc-800 pb-4 text-white">Your Order</h3>

              <div className="space-y-6">
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">Tickets</h4>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-zinc-300">{booking.seats?.length || 0}x Seats Selected</span>
                    <span className="text-white font-medium">MYR {totalSeats.toFixed(2)}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">Food & Beverage</h4>
                  {cart.length === 0 ? (
                    <p className="text-sm text-zinc-600 italic">No items added</p>
                  ) : (
                    <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-black/50 p-3 rounded-lg border border-zinc-800">
                          <div className="flex items-center gap-3">
                            <span className="bg-zinc-800 text-zinc-300 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-md">{item.quantity}</span>
                            <span className="text-sm font-medium text-white truncate max-w-[120px]">{item.name}</span>
                          </div>
                          <span className="text-sm font-bold text-red-400">MYR {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-zinc-800 pt-6">
                  <div className="flex justify-between items-center mb-6 bg-red-950/20 p-4 rounded-xl border border-red-900/30">
                    <span className="text-red-200 font-medium">Grand Total</span>
                    <span className="text-3xl font-bold text-white">MYR {(totalSeats + totalFood).toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handleContinue}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/30 transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => {
                      updateBooking({ food: [] });
                      navigate("/summary");
                    }}
                    className="w-full py-3 mt-3 rounded-xl font-bold text-sm bg-transparent border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-300 transition-all"
                  >
                    Skip F&B
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
