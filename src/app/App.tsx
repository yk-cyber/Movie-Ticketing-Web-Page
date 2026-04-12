import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AppProvider } from "./context";
import { Film } from "lucide-react";

const SplashScreen = () => (
  <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] text-white animate-in fade-in duration-300">
    <div className="flex flex-col items-center">
      <Film className="w-24 h-24 text-red-600 mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold tracking-tighter mb-8">No Cinema</h1>
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
      {showSplash ? <SplashScreen /> : <RouterProvider router={router} />}
    </AppProvider>
  );
}
