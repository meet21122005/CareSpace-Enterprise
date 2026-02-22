import { motion } from 'motion/react';
import { Shield, Activity } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export function MobileBanner() {
  return (
    <motion.div
      className="lg:hidden relative w-full mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758691462749-a95ce1bd7f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwZG9jdG9yJTIwcGF0aWVudCUyMG1vZGVybnxlbnwxfHx8fDE3NzA0MDY2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Healthcare Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-900/40 to-sky-50 dark:to-slate-950" />
        
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <motion.div
            className="flex-1 backdrop-blur-xl bg-white/30 dark:bg-white/10 border border-white/50 dark:border-white/20 rounded-xl px-3 py-2"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-white font-medium">Certified</span>
            </div>
          </motion.div>
          
          <motion.div
            className="flex-1 backdrop-blur-xl bg-white/30 dark:bg-white/10 border border-white/50 dark:border-white/20 rounded-xl px-3 py-2"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              <span className="text-xs text-white font-medium">24/7 Available</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="px-4 py-6 text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Making Quality Healthcare
          <span className="block bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
            Accessible to All
          </span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Premium medical equipment rental with doorstep delivery
        </p>
      </div>
    </motion.div>
  );
}
