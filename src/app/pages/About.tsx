import { Film, Clapperboard, Users, Trophy } from "lucide-react";

export const About = () => {
  return (
    <div className="w-full bg-black min-h-screen text-white pt-12 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Film className="w-16 h-16 text-red-600 mx-auto mb-6" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Redefining the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Cinema Experience</span></h1>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          VisionX Cinema was founded with a single mission: to bring the magic of movies back to life. We combine cutting-edge technology with unparalleled comfort to create unforgettable nights out.
        </p>
      </section>

      {/* Stats/Highlight Section */}
      <section className="bg-zinc-900/50 border-y border-zinc-800 py-16 mb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mb-4">
              <Clapperboard className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-4xl font-bold mb-2">500+</h3>
            <p className="text-zinc-500">Movies Screened Annually</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-4xl font-bold mb-2">2M+</h3>
            <p className="text-zinc-500">Happy Moviegoers</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-4xl font-bold mb-2">15</h3>
            <p className="text-zinc-500">Award-Winning Halls</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Starting as a single-screen vintage theater in 2010, VisionX has rapidly evolved into a nationwide phenomenon. We noticed that going to the movies had lost its charm—so we decided to fix it.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Today, every VisionX location features our signature 4K ultra-bright laser projection, custom-tuned Dolby Atmos soundscapes, and reclining VIP leather seating as standard. We don't just show movies; we immerse you in them.
          </p>
        </div>
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
          <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF8ZW58MHx8fHwxNzE1NTI5OTQyfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Cinema Hall View" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </section>
    </div>
  );
};
