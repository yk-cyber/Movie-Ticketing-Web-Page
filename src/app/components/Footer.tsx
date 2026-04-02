import { Github, Twitter, Instagram, Film } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
            <Film className="w-6 h-6 text-red-600" />
            <span>VIsionX Cinema</span>
          </div>
          <p className="text-sm text-zinc-500 max-w-xs">
            Experience the magic of cinema with seamless ticketing and unbeatable comfort.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-red-400 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-red-400 transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-red-400 transition-colors">Refund Policy</a></li>
            <li><a href="#" className="hover:text-red-400 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-400 transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-red-400 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-red-400 transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-900 text-sm text-center text-zinc-600">
        © {new Date().getFullYear()} VIsionX Cinema Inc. All rights reserved.
      </div>
    </footer>
  );
};
