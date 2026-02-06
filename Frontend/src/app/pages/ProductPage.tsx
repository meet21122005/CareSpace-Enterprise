import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Home, Check, MessageCircle, Phone, Mail, Star, Play } from 'lucide-react';
import { useProduct, useRelatedProducts, useCategory, useCategories } from '@/hooks';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { getProductImageUrl, handleImageError } from '@/utils/images';

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading: productLoading, error: productError } = useProduct(id);
  const { products: relatedProducts, loading: relatedLoading } = useRelatedProducts(id);
  const { categories } = useCategories();
  
  const [selectedDuration, setSelectedDuration] = useState<'1month' | '2month' | '3month'>('1month');
  const [selectedImage, setSelectedImage] = useState(0);

  // Get category info
  const category = categories.find(c => c.id === product?.category_id);

  // Parse specifications from string to object
  const parseSpecifications = (specs: string | null): Record<string, string> => {
    if (!specs) return {};
    try {
      return JSON.parse(specs);
    } catch {
      // If not JSON, try to parse as key-value pairs
      const result: Record<string, string> = {};
      specs.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim());
        if (key && value) result[key] = value;
      });
      return result;
    }
  };

  // Parse features from description
  const parseFeatures = (description: string | null): string[] => {
    if (!description) return [];
    // Extract bullet points or numbered items
    const lines = description.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'));
    if (lines.length > 0) {
      return lines.map(line => line.replace(/^[-•]\s*/, '').trim());
    }
    // If no bullets, return first 4 sentences as features
    return description.split('.').slice(0, 4).map(s => s.trim()).filter(Boolean);
  };

  // Get price based on duration
  const getPrice = (): string => {
    if (!product) return '₹0';
    const priceMap = {
      '1month': product.price_1month,
      '2month': product.price_2month,
      '3month': product.price_3month,
    };
    const price = priceMap[selectedDuration];
    return price ? `₹${price.toLocaleString()}` : 'Contact for price';
  };

  const getDurationLabel = (): string => {
    const labels = { '1month': '/month', '2month': '/2 months', '3month': '/3 months' };
    return labels[selectedDuration];
  };

  // Get YouTube video ID
  const getYouTubeId = (url: string | null): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const handleWhatsAppEnquiry = () => {
    const phoneNumber = '911234567890';
    const duration = selectedDuration === '1month' ? '1 month' : selectedDuration === '2month' ? '2 months' : '3 months';
    const message = `Hi, I'm interested in renting the ${product?.name} for ${duration}. Could you please provide more details?`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCallEnquiry = () => {
    window.location.href = 'tel:+911234567890';
  };

  const handleEmailEnquiry = () => {
    const email = 'info@carespace.com';
    const duration = selectedDuration === '1month' ? '1 month' : selectedDuration === '2month' ? '2 months' : '3 months';
    const subject = `Enquiry: ${product?.name}`;
    const body = `Hi,\n\nI'm interested in renting the ${product?.name} for ${duration}.\n\nCould you please provide more details about availability, pricing, and delivery?\n\nThank you!`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  if (productLoading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="bg-[#f8fafb] border-b border-[#e0f2fe] py-4">
          <div className="max-w-7xl mx-auto px-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-64" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
              <div className="grid grid-cols-3 gap-4">
                {[1,2,3].map(i => <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />)}
              </div>
            </div>
            <div className="space-y-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-24 bg-gray-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="min-h-screen pt-12 md:pt-14 lg:pt-16 xl:pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-4">Product not found</h1>
          <Link to="/rent" className="text-[#0891b2] hover:underline">Back to all products</Link>
        </div>
      </div>
    );
  }

  const productImage = getProductImageUrl(product.image_url, product.slug);
  const productImages = [productImage, productImage, productImage]; // In production, you'd have multiple images
  const specifications = parseSpecifications(product.specifications);
  const features = parseFeatures(product.description);
  const youtubeId = getYouTubeId(product.youtube_url);

  return (
    <div className="min-h-screen pt-12 md:pt-14 lg:pt-16 xl:pt-20">
      <Helmet>
        <title>{product.seo_meta_title || `${product.name} - Rent Medical Equipment | Carespace India Mumbai`}</title>
        <meta name="description" content={product.seo_meta_description || `${product.description?.substring(0, 155)}... Rent ${product.name} in Mumbai with doorstep delivery.`} />
        <meta name="keywords" content={`${product.name}, rent ${product.name}, medical equipment rental, ${category?.name || 'medical equipment'}, mumbai`} />
        <link rel="canonical" href={`https://carespace.in/product/${product.slug}`} />
        <meta property="og:title" content={product.seo_meta_title || `${product.name} - Rent Medical Equipment | Carespace India Mumbai`} />
        <meta property="og:description" content={product.seo_meta_description || `${product.description?.substring(0, 155)}...`} />
        <meta property="og:image" content={product.image_url ? `https://carespace.in${product.image_url}` : 'https://carespace.in/images/logo.png'} />
        <meta property="og:url" content={`https://carespace.in/product/${product.slug}`} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.seo_meta_title || `${product.name} - Rent Medical Equipment | Carespace India Mumbai`} />
        <meta name="twitter:description" content={product.seo_meta_description || `${product.description?.substring(0, 155)}...`} />
        <meta name="twitter:image" content={product.image_url ? `https://carespace.in${product.image_url}` : 'https://carespace.in/images/logo.png'} />
      </Helmet>
      {/* Breadcrumb */}
      <div className="bg-[#f8fafb] border-b border-[#e0f2fe] py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="text-[#64748b] hover:text-[#0891b2] transition-colors flex items-center gap-1 flex-shrink-0">
              <Home className="w-3 h-3 sm:w-4 sm:h-4" />Home
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#64748b] flex-shrink-0" />
            <Link to="/rent" className="text-[#64748b] hover:text-[#0891b2] transition-colors truncate">Rent</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#64748b] flex-shrink-0" />
            {category && (
              <>
                <Link to={`/category/${category.slug}`} className="text-[#64748b] hover:text-[#0891b2] transition-colors truncate">{category.name}</Link>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#64748b] flex-shrink-0" />
              </>
            )}
            <span className="text-[#0891b2] font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="glass-card rounded-2xl overflow-hidden aspect-square">
              <img src={productImages[selectedImage]} alt={product.name} className="w-full h-full object-contain bg-white p-4" onError={handleImageError} loading="lazy" />
            </div>

            {/* YouTube Video */}
            {youtubeId && (
              <div className="glass-card rounded-2xl overflow-hidden aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={product.name}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              {productImages.map((img, index) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={`glass-card rounded-xl overflow-hidden aspect-square transition-all ${selectedImage === index ? 'ring-2 ring-[#0891b2] shadow-lg' : 'opacity-70 hover:opacity-100'}`}>
                  <img src={img} alt={`${product.name} - View ${index + 1}`} className="w-full h-full object-contain bg-white p-2" onError={handleImageError} loading="lazy" />
                </button>
              ))}
            </div>

            {/* Trust Badges - Mobile */}
            <div className="grid grid-cols-2 gap-4 lg:hidden">
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4" fill="currentColor" />)}
                </div>
                <p className="text-xs text-[#64748b]">Certified Equipment</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#0891b2] mb-1">24/7</div>
                <p className="text-xs text-[#64748b]">Support Available</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              {category && (
                <Link to={`/category/${category.slug}`} className="text-sm text-[#0891b2] hover:underline font-medium mb-2 inline-block">{category.name}</Link>
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a2332] mb-4">{product.name}</h1>
              <p className="text-[#64748b]">{product.description}</p>
            </div>

            {/* Price */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl sm:text-4xl font-bold text-[#0891b2]">{getPrice()}</span>
                <span className="text-[#64748b]">{getDurationLabel()}</span>
              </div>
              <p className="text-sm text-[#64748b]">Flexible rental plans available • Free delivery</p>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block text-sm font-semibold text-[#1a2332] mb-3">Select Rental Duration</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: '1month', label: '1 Month', price: product.price_1month },
                  { key: '2month', label: '2 Months', price: product.price_2month },
                  { key: '3month', label: '3 Months', price: product.price_3month },
                ].map(({ key, label, price }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDuration(key as '1month' | '2month' | '3month')}
                    disabled={!price}
                    className={`px-4 py-3 rounded-xl border-2 transition-all ${
                      selectedDuration === key
                        ? 'border-[#0891b2] bg-[#e0f2fe] text-[#0891b2] font-semibold'
                        : price
                          ? 'border-[#e0f2fe] text-[#64748b] hover:border-[#0891b2]'
                          : 'border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button onClick={handleWhatsAppEnquiry} size="lg" variant="primary" className="w-full">
                <MessageCircle className="w-5 h-5 mr-2" />Enquire on WhatsApp
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handleCallEnquiry} size="md" variant="outline" className="w-full">
                  <Phone className="w-5 h-5 mr-2" />Call Now
                </Button>
                <Button onClick={handleEmailEnquiry} size="md" variant="secondary" className="w-full">
                  <Mail className="w-5 h-5 mr-2" />Email Us
                </Button>
              </div>
            </div>

            {/* Trust Badges - Desktop */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4" fill="currentColor" />)}
                </div>
                <p className="text-xs text-[#64748b]">Certified Equipment</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#0891b2] mb-1">24/7</div>
                <p className="text-xs text-[#64748b]">Support Available</p>
              </div>
            </div>

            {/* Key Features */}
            {product.key_features && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#1a2332] mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {product.key_features.split('\n').filter(feature => feature.trim()).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#e0f2fe] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#0891b2]" />
                      </div>
                      <span className="text-[#64748b]">{feature.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>

        {/* Features & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {Object.keys(specifications).length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-[#1a2332] mb-4">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-[#e0f2fe] last:border-0">
                    <span className="text-[#64748b] font-medium">{key}</span>
                    <span className="text-[#1a2332] font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Related Products */}
        {!relatedLoading && relatedProducts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2332] mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
