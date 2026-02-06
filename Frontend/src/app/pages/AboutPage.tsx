import { motion } from 'motion/react';
import { Heart, Target, Users, Award } from 'lucide-react';

export const AboutPage = () => {
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
              About Carespace India
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Making quality healthcare accessible through premium medical equipment rental services
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#0891b2] to-[#14b8a6] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a2332] mb-4">Our Mission</h2>
            <p className="text-[#64748b] leading-relaxed">
              To provide accessible, affordable, and high-quality medical equipment rental services
              that enable patients to receive the best possible care in the comfort of their homes
              or healthcare facilities. We strive to bridge the gap between healthcare needs and
              financial constraints.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#0891b2] to-[#14b8a6] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a2332] mb-4">Our Vision</h2>
            <p className="text-[#64748b] leading-relaxed">
              To become India's most trusted and preferred medical equipment rental platform,
              revolutionizing healthcare accessibility across the nation. We envision a future
              where quality medical equipment is available to every patient who needs it,
              regardless of their location or economic status.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-[#1a2332] text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Quality',
                description: 'Hospital-grade equipment with regular maintenance and certification'
              },
              {
                icon: Users,
                title: 'Customer First',
                description: '24/7 support and personalized care for every customer'
              },
              {
                icon: Heart,
                title: 'Empathy',
                description: 'Understanding patient needs with compassion and care'
              },
              {
                icon: Target,
                title: 'Reliability',
                description: 'Timely delivery and dependable service you can trust'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0891b2] to-[#14b8a6] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a2332] mb-2">{value.title}</h3>
                <p className="text-sm text-[#64748b]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 sm:p-12"
        >
          <h2 className="text-3xl font-bold text-[#1a2332] mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-[#64748b] space-y-4">
            <p>
              Carespace India was founded with a simple yet powerful vision: to make healthcare more
              accessible and affordable for everyone. Our journey began when we witnessed firsthand
              the challenges faced by patients and families trying to access quality medical equipment.
            </p>
            <p>
              Starting with operations in Mumbai and Varanasi, we've grown to become a trusted partner
              for hospitals, clinics, and home care providers. Our extensive inventory includes
              everything from basic mobility aids to advanced life-support systems, all maintained
              to the highest standards of quality and safety.
            </p>
            <p>
              Today, we're proud to serve thousands of patients across India, helping them receive
              the care they need in the comfort of their homes. Our team of dedicated professionals
              works tirelessly to ensure that every piece of equipment is delivered on time, properly
              installed, and fully functional.
            </p>
            <p>
              As we continue to grow, our commitment remains unchanged: providing excellent service,
              maintaining the highest quality standards, and making healthcare accessible to all.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
