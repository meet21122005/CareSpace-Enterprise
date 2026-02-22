import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function GradientButton({ 
  children, 
  loading = false, 
  variant = 'primary',
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props 
}: GradientButtonProps) {
  const baseStyles = `
    relative px-6 py-3.5 rounded-2xl font-medium
    transition-all duration-300 overflow-hidden
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
    ${fullWidth ? 'w-full' : ''}
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500
      text-white shadow-lg shadow-sky-500/30
      hover:shadow-xl hover:shadow-sky-500/40
      disabled:hover:shadow-lg
    `,
    secondary: `
      backdrop-blur-xl bg-white/60 dark:bg-white/5
      border-2 border-white/50 dark:border-white/10
      text-slate-700 dark:text-slate-200
      shadow-md hover:shadow-lg
      hover:bg-white/80 dark:hover:bg-white/10
    `,
    outline: `
      border-2 border-sky-500/50 dark:border-sky-400/50
      text-sky-600 dark:text-sky-400
      hover:bg-sky-50 dark:hover:bg-sky-950/30
      shadow-md hover:shadow-lg hover:shadow-sky-500/20
    `
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      disabled={disabled || loading}
      {...props}
    >
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      )}
      
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : icon ? (
          icon
        ) : null}
        {children}
      </span>
      
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 opacity-0 hover:opacity-30 blur-xl transition-opacity -z-10" />
      )}
    </motion.button>
  );
}
