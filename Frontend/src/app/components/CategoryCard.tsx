import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Bed, 
  Wind, 
  Activity, 
  Heart, 
  Monitor, 
  Syringe, 
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  bed: Bed,
  wind: Wind,
  activity: Activity,
  heart: Heart,
  monitor: Monitor,
  syringe: Syringe,
  lungs: Wind, // Use Wind as fallback for lungs
};

interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount?: number;
}

export const CategoryCard = ({ name, slug, description, icon, productCount }: CategoryCardProps) => {
  const Icon = iconMap[icon] || Bed;

  return (
    <Link to={`/category/${slug}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="glass-card rounded-2xl p-6 cursor-pointer group transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0891b2] to-[#14b8a6] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/40 transition-all duration-300">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#1a2332] mb-2 group-hover:text-[#0891b2] transition-colors">
              {name}
            </h3>
            <p className="text-sm text-[#64748b] line-clamp-2">
              {description}
            </p>
            {productCount !== undefined && productCount > 0 && (
              <p className="text-xs text-[#0891b2] mt-2 font-medium">
                {productCount} {productCount === 1 ? 'Product' : 'Products'}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
