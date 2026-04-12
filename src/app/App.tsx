import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AppProvider } from "./context";
import { Film } from "lucide-react";

const SplashScreen = () => (
  <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-[9999] text-white animate-in fade-in duration-300">
    <div className="flex flex-col items-center">
      <Film className="w-24 h-24 text-red-600 mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold tracking-tighter mb-8">VisionX Cinema</h1>
      <div className="w-10 h-10 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin"></div>
    </div>
  </div>
);

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider>
      <div className="min-h-screen bg-zinc-950 flex justify-center text-zinc-100 font-sans selection:bg-red-900 selection:text-white">
        <div className="w-full max-w-[430px] min-h-screen flex flex-col bg-black relative shadow-2xl overflow-x-hidden border-x border-zinc-800">
          {showSplash ? <SplashScreen /> : <RouterProvider router={router} />}
        </div>
      </div>
    </AppProvider>
  );
}
