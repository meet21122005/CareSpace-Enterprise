import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '../components/Button';
import { leadsApi } from '@/services/api';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      await leadsApi.create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: `${formData.subject ? `${formData.subject} — ` : ''}${formData.message}`,
        source: 'contact_form',
        page_url: window.location.href,
      });
      alert('Thank you for contacting us! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submission failed', err);
      alert('Could not send your message. Please try again or call +91 8922069800.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-12 md:pt-14 lg:pt-16 xl:pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0891b2] to-[#14b8a6] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Get in touch with our team. We're here to help you 24/7
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#0891b2] to-[#14b8a6] rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a2332] mb-2">Phone</h3>
              <p className="text-[#64748b] mb-2">Call us anytime</p>
              <a href="tel:+918922069800" className="text-[#0891b2] font-medium hover:underline">
                +91 8922069800
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#0891b2] to-[#14b8a6] rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a2332] mb-2">Email</h3>
              <p className="text-[#64748b] mb-2">Send us a message</p>
              <a href="mailto:Info.carespaceindia@gmail.com" className="text-[#0891b2] font-medium hover:underline">
                Info.carespaceindia@gmail.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#0891b2] to-[#14b8a6] rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a2332] mb-2">Locations</h3>
              <p className="text-[#64748b] mb-2">Mumbai & Varanasi</p>
              <p className="text-sm text-[#64748b]">
                Serving across India with fast delivery
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#0891b2] to-[#14b8a6] rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a2332] mb-2">Hours</h3>
              <p className="text-[#64748b]">24/7 Support Available</p>
              <p className="text-sm text-[#64748b] mt-2">
                Emergency support always available
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-[#1a2332] mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1a2332] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-[#e0f2fe] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a2332] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-[#e0f2fe] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1a2332] mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-[#e0f2fe] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent transition-all"
                    placeholder="+91 8922069800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a2332] mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-[#e0f2fe] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent transition-all"
                    placeholder="How can we help?"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1a2332] mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/70 border border-[#e0f2fe] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891b2] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your needs..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" size="lg" variant="primary" className="w-full">
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
