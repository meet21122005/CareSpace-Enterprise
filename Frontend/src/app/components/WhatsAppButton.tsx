import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '911234567890'; // Replace with actual WhatsApp number
    const message = 'Hi, I would like to inquire about medical equipment rental.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </motion.button>
  );
};
