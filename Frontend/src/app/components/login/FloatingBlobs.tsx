import { motion } from 'motion/react';

export function FloatingBlobs() {
  return (
    <>
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-sky-400/30 to-cyan-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      <motion.div
        className="absolute -bottom-32 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/25 to-sky-400/25 rounded-full blur-3xl"
        animate={{
          x: [0, 70, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </>
  );
}
