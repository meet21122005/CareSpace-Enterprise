import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Heart, CheckCircle2 } from 'lucide-react';
import { FormInput } from './FormInput';
import { GradientButton } from './GradientButton';
import { SocialButton } from './SocialButton';

export function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative backdrop-blur-2xl bg-white/70 dark:bg-white/5 border-2 border-white/50 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 opacity-50 blur-2xl -z-10" />
        
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8 space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Welcome Back!
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Login successful. Redirecting to dashboard...
                </p>
              </div>
              
              <motion.div
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
                  <Heart className="w-9 h-9 text-white" fill="white" />
                </div>
              </motion.div>

              <div className="text-center mb-8 space-y-2">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Welcome Back</h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Sign in to access your Carespace account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  icon={<Mail className="w-5 h-5" />}
                />

                <FormInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  icon={<Lock className="w-5 h-5" />}
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-5 h-5 rounded-lg border-2 border-slate-300 dark:border-slate-600 checked:bg-gradient-to-br checked:from-sky-500 checked:to-cyan-500 checked:border-transparent appearance-none cursor-pointer transition-all"
                      />
                      {rememberMe && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                      Remember me
                    </span>
                  </label>

                  <motion.a
                    href="/contact"
                    className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Forgot Password?
                  </motion.a>
                </div>

                <GradientButton type="submit" fullWidth loading={isLoading} variant="primary">
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </GradientButton>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-slate-200 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-sm text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-white/5 backdrop-blur-xl">
                    OR
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <SocialButton
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <g>
                        <path d="M12 2.5c2.4 0 4.5.8 6.1 2.1l-2.3 2.3c-.9-.7-2-.9-3.1-.9-2.4 0-4.4 1.6-5.1 3.8l-2.4-1.9C5.1 4.7 8.3 2.5 12 2.5z" fill="#EA4335"/>
                        <path d="M21.6 12.3c0-.7-.1-1.4-.2-2H12v4h5.6c-.2 1.1-.8 2-1.7 2.7l2.3 1.8c1.3-1.2 2.4-3.1 2.4-5.5z" fill="#4285F4"/>
                        <path d="M12 21.5c2.1 0 3.9-.7 5.2-1.9l-2.3-1.8c-.7.5-1.6.8-2.9.8-2.2 0-4.1-1.5-4.8-3.5l-2.4 1.9C5.1 19.3 8.3 21.5 12 21.5z" fill="#34A853"/>
                        <path d="M3.5 12c0-.7.1-1.4.2-2l2.4 1.9c-.2.6-.2 1.2-.2 1.8s.1 1.2.2 1.8l-2.4 1.9C3.6 14.6 3.5 13.3 3.5 12z" fill="#FBBC05"/>
                      </g>
                    </svg>
                  }
                  provider="Google"
                  onClick={() => alert('Google login clicked')}
                />

                {/* Google login button removed as requested */}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Don't have an account?{' '}
                  <motion.a
                    href="/contact"
                    className="font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Talk to us
                  </motion.a>
                </p>
              </div>

              <motion.div
                className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <span>Secure 256-bit SSL Encrypted Login</span>
              </motion.div>

              <motion.div
                className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <span>⚖ WCAG 2.1 AA Compliant</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        By continuing, you agree to our{' '}
        <a href="/terms" className="text-sky-600 dark:text-sky-400 hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-sky-600 dark:text-sky-400 hover:underline">
          Privacy Policy
        </a>
      </motion.div>
    </motion.div>
  );
}
