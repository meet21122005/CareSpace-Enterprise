import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { getProductImageUrl, handleImageError } from '@/utils/images';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = getProductImageUrl(product.image_url, product.slug);
  
  // Format price
  const formatPrice = (price: number | null): string => {
    if (!price) return 'Contact for price';
    return `₹${price.toLocaleString()}/month`;
  };

  // Get category display name
  const getCategoryDisplay = (): string => {
    if (product.category_name) return product.category_name;
    return 'Equipment';
  };

  return (
    <Link to={`/product/${product.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="glass-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-[#e0f2fe] to-[#f0f9ff]">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={handleImageError}
            loading="lazy"
          />
          <div className="absolute top-3 right-3 px-3 py-1 glass-strong rounded-lg text-xs font-semibold text-[#0891b2]">
            {getCategoryDisplay()}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-[#1a2332] mb-3 line-clamp-2 group-hover:text-[#0891b2] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-[#64748b] mb-6 line-clamp-2 flex-1">
            {product.description || 'Premium medical equipment available for rent with flexible plans.'}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto pt-5 border-t border-[#e0f2fe]">
            <div>
              <div className="text-xs text-[#64748b] mb-1">Starting from</div>
              <div className="text-xl font-bold text-[#0891b2]">{formatPrice(product.price_1month)}</div>
            </div>
            <Button size="sm" variant="primary" className="w-full sm:w-auto">
              View Details
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
