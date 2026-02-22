import { useState, forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, success, icon, type = 'text', className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              {icon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            type={inputType}
            id={inputId}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={`
              w-full px-4 py-3.5 rounded-2xl
              ${icon ? 'pl-12' : ''}
              ${isPassword ? 'pr-12' : ''}
              backdrop-blur-xl bg-white/60 dark:bg-white/5
              border-2 transition-all duration-300
              ${error ? 'border-rose-400 dark:border-rose-500' : 
                success ? 'border-emerald-400 dark:border-emerald-500' : 
                isFocused ? 'border-sky-400 dark:border-sky-500' : 
                'border-white/50 dark:border-white/10'}
              ${error ? 'shadow-lg shadow-rose-500/20' : 
                success ? 'shadow-lg shadow-emerald-500/20' :
                isFocused ? 'shadow-lg shadow-sky-500/20' : 
                'shadow-md'}
              text-slate-800 dark:text-white
              placeholder:text-slate-400 dark:placeholder:text-slate-500
              focus:outline-none
              ${className}
            `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
          
          {success && !isPassword && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500"
            >
              <CheckCircle2 className="w-5 h-5" />
            </motion.div>
          )}
          
          <AnimatePresence>
            {isFocused && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 opacity-20 blur-xl -z-10"
              />
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400"
              id={`${inputId}-error`}
              role="alert"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
