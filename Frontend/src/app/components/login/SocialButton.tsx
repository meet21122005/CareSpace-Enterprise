import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  provider: string;
}

export function SocialButton({ icon, provider, className = '', ...props }: SocialButtonProps) {
  return (
    <motion.button
      className={`
        relative w-full px-6 py-3.5 rounded-2xl
        backdrop-blur-xl bg-white/60 dark:bg-white/5
        border-2 border-white/50 dark:border-white/10
        text-slate-700 dark:text-slate-200
        shadow-md hover:shadow-lg
        hover:bg-white/80 dark:hover:bg-white/10
        transition-all duration-300
        flex items-center justify-center gap-3
        ${className}
      `}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">Continue with {provider}</span>
    </motion.button>
  );
}
