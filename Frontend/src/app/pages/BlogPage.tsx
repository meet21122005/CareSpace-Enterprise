import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding CPAP vs BiPAP: Which is Right for You?',
    excerpt: 'Learn about the key differences between CPAP and BiPAP machines and how to choose the right respiratory therapy equipment.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    author: 'Dr. Sharma',
    date: 'January 25, 2026',
    category: 'Respiratory Care'
  },
  {
    id: 2,
    title: 'Home Care Setup: Essential Medical Equipment Guide',
    excerpt: 'A comprehensive guide to setting up a home care environment with the right medical equipment for patient comfort and safety.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    author: 'Nurse Priya',
    date: 'January 20, 2026',
    category: 'Home Care'
  },
  {
    id: 3,
    title: 'Benefits of Renting vs Buying Medical Equipment',
    excerpt: 'Explore the cost-effectiveness and flexibility of renting medical equipment compared to purchasing outright.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80',
    author: 'Admin Team',
    date: 'January 15, 2026',
    category: 'Healthcare Tips'
  },
  {
    id: 4,
    title: 'Oxygen Concentrator Maintenance: Best Practices',
    excerpt: 'Essential tips for maintaining your oxygen concentrator to ensure optimal performance and longevity.',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80',
    author: 'Technician Raj',
    date: 'January 10, 2026',
    category: 'Maintenance'
  },
  {
    id: 5,
    title: 'Hospital Beds: Choosing the Right Type for Patient Care',
    excerpt: 'Understanding different types of hospital beds and their features to make an informed rental decision.',
    image: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=80',
    author: 'Dr. Kumar',
    date: 'January 5, 2026',
    category: 'Patient Care'
  },
  {
    id: 6,
    title: 'Patient Monitoring Systems: A Complete Overview',
    excerpt: 'Learn about the importance of patient monitoring systems and how they enhance care quality at home.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
    author: 'Dr. Sharma',
    date: 'December 30, 2025',
    category: 'Medical Technology'
  }
];

export const BlogPage = () => {
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
              Healthcare Blog
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Expert insights, tips, and guides on medical equipment and home care
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#e0f2fe] to-[#f0f9ff]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 px-3 py-1 glass-strong rounded-lg text-xs font-semibold text-[#0891b2]">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-[#64748b] mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[#1a2332] mb-2 line-clamp-2 group-hover:text-[#0891b2] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[#64748b] mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#0891b2] hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};
