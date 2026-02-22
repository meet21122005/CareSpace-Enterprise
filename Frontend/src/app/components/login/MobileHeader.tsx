import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function MobileHeader() {
  return (
    <motion.div
      className="lg:hidden fixed top-0 left-0 right-0 z-20 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-white/50 dark:border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-sky-700 to-cyan-600 bg-clip-text text-transparent">
              Carespace India
            </h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
