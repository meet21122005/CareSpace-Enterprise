import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Mail, User } from 'lucide-react';
import { Button } from './Button';
import { leadsApi } from '@/services/api';
import { toast } from 'sonner';

export const EnquiryPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    // Show popup after 10 minutes (600000 ms)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600000);

    // For demo purposes, show after 30 seconds
    const demoTimer = setTimeout(() => {
      // Uncomment next line for demo
      // setIsVisible(true);
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearTimeout(demoTimer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      await leadsApi.create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        source: 'popup',
        page_url: window.location.href,
      });
      setIsVisible(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      toast.success('Thanks! We received your enquiry and will reach out shortly.');
    } catch (err) {
      console.error('Failed to submit enquiry', err);
      toast.error('Could not submit your enquiry. Please try again or call us at +91 8922069800.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsVisible(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="glass-strong rounded-2xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#1a2332]">Need Assistance?</h3>
                  <p className="text-sm text-[#64748b] mt-1">Let us help you find the right equipment</p>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="w-8 h-8 flex items-center justify-center glass-subtle rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1a2332] mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#0891b2]" />
                      Name
                    </div>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/70 border border-[#e0f2fe] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a2332] mb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#0891b2]" />
                      Email
                    </div>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/70 border border-[#e0f2fe] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a2332] mb-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#0891b2]" />
                      Phone
                    </div>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/70 border border-[#e0f2fe] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent transition-all"
                    placeholder="+91 8922069800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a2332] mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/70 border border-[#e0f2fe] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent transition-all resize-none"
                    placeholder="How can we help you?"
                    rows={3}
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
