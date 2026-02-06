import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Shield, Clock, Headphones, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useCategories, useProducts } from '@/hooks';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { getAllSlideImages } from '@/utils/images';

export const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();

  // Get slide images from local directory
  const slideImages = getAllSlideImages();
  
  const heroSlides = [
    { image: slideImages[0] || '/images/slides/1.png' },
    { image: slideImages[1] || '/images/slides/2.png' },
    { image: slideImages[2] || '/images/slides/3.png' },
    { image: slideImages[3] || '/images/slides/4.jpg' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }
    if (touchStart - touchEnd < -75) {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const popularProducts = products.slice(0, 8);

  const getCategoryIcon = (slug: string): string => {
    const iconMap: Record<string, string> = {
      'air-mattress': 'bed',
      'cpap': 'wind',
      'bipap': 'activity',
      'dvt-pump': 'heart-pulse',
      'hospital-bed': 'bed-double',
      'oxygen-concentrator': 'circle-dot',
      'patient-monitor': 'monitor',
      'suction-machine': 'syringe',
      'syringe-pump': 'droplet',
      'ventilator': 'waves',
    };
    return iconMap[slug] || 'bed';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <section 
        className="relative h-[300px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1
            }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
            style={{ pointerEvents: currentSlide === index ? 'auto' : 'none' }}
          >
            <div className="absolute inset-0 bg-white">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          </motion.div>
        ))}

        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass-strong rounded-full flex items-center justify-center text-[#0891b2] hover:bg-white transition-all" aria-label="Previous slide">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass-strong rounded-full flex items-center justify-center text-[#0891b2] hover:bg-white transition-all" aria-label="Next slide">
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50'}`} aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2332] mb-4">Equipment Categories</h2>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto">Browse our comprehensive range of medical equipment across multiple categories</p>
        </motion.div>

        {categoriesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
                  <div className="w-24 h-4 bg-gray-200 rounded" />
                  <div className="w-32 h-3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                <CategoryCard id={category.id} name={category.name} slug={category.slug} description={category.description || ''} icon={getCategoryIcon(category.slug)} productCount={category.product_count} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Popular Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2332] mb-4">Popular Rentals</h2>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto">Most sought-after medical equipment trusted by healthcare professionals</p>
        </motion.div>

        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {popularProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
          <Link to="/rent"><Button size="lg" variant="primary">View All Equipment<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
        </motion.div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-gradient-to-br from-[#e0f2fe] to-[#f0f9ff] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2332] mb-4">Why Choose CareSpace?</h2>
            <p className="text-lg text-[#64748b]">Trusted by thousands of healthcare professionals across India</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, title: 'Certified Equipment', description: 'All equipment is certified and regularly maintained' },
              { icon: Shield, title: 'Quality Assured', description: 'Hospital-grade equipment with quality guarantee' },
              { icon: Clock, title: 'Quick Delivery', description: 'Fast delivery within 24-48 hours' },
              { icon: Headphones, title: '24/7 Support', description: 'Round-the-clock customer support and assistance' }
            ].map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0891b2] to-[#14b8a6] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a2332] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#64748b]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
