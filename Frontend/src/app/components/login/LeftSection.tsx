import React from 'react';
import { motion } from 'motion/react';
import { Heart, Stethoscope, Activity, Shield } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const equipmentCategories = [
  { icon: Heart, label: 'Oxygen Support', color: 'from-rose-500 to-pink-500' },
  { icon: Activity, label: 'Monitors', color: 'from-cyan-500 to-blue-500' },
  { icon: Stethoscope, label: 'Diagnostics', color: 'from-teal-500 to-emerald-500' },
  { icon: Shield, label: 'Safety Equipment', color: 'from-sky-500 to-indigo-500' },
];

export function LeftSection() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center p-12 relative">
      <motion.div
        className="absolute top-12 left-12 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo and branding removed as requested */}
      </motion.div>

      <div className="max-w-xl space-y-8">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Slide show for local images */}
            {(() => {
              const slides = [
                '/images/slides/1.png',
                '/images/slides/2.png',
                '/images/slides/3.png',
                '/images/slides/4.jpg',
              ];
              const [current, setCurrent] = React.useState(0);
              React.useEffect(() => {
                const interval = setInterval(() => {
                  setCurrent((prev) => (prev + 1) % slides.length);
                }, 4000);
                return () => clearInterval(interval);
              }, []);
              return (
                <>
                  <img
                    src={slides[current]}
                    alt="Medical Equipment Slide"
                    className="w-full h-80 object-contain bg-white transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-900/40 to-transparent z-0" />
                  <div
                    className="absolute bottom-6 right-6 backdrop-blur-xl bg-white/20 dark:bg-white/10 border border-white/30 rounded-2xl px-4 py-3 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-sm text-white">Available 24/7</span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white leading-tight">
            Making Quality Healthcare
            <span className="block bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              Accessible to All
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Rent premium medical equipment with doorstep delivery across Mumbai. 
            Trusted by 10,000+ families and healthcare providers.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {equipmentCategories.map((category, index) => (
            <motion.div
              key={category.label}
              className="group relative backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 rounded-2xl p-4 hover:bg-white/60 dark:hover:bg-white/10 transition-all cursor-pointer shadow-lg hover:shadow-xl"
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                <category.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {category.label}
              </p>
              
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-12 right-12 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>Certified & Sanitized</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-500" />
          <span>ISO 9001:2015</span>
        </div>
      </motion.div>
    </div>
  );
}
