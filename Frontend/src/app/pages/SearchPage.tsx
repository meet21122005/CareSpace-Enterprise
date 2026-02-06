import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search as SearchIcon, Home, ChevronRight } from 'lucide-react';
import { productsApi } from '@/services/api';
import { ProductCard } from '../components/ProductCard';
import type { ProductSearchResult } from '@/types';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const searchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsApi.search(query);
        setResults(data);
      } catch (err) {
        console.error('Search failed:', err);
        setError('Search failed. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [query]);

  // Convert search results to product format for ProductCard
  const resultsAsProducts = results.map(r => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    category_id: '', // Not available in search results
    price_1month: r.price_1month,
    price_2month: null,
    price_3month: null,
    image_url: r.image_url,
    description: null,
    specifications: null,
    youtube_url: r.youtube_url,
    // Extra fields for display
    category_name: r.category_name,
    category_slug: r.category_slug,
  }));

  return (
    <div className="min-h-screen pt-12 md:pt-14 lg:pt-16 xl:pt-20">
      {/* Breadcrumb */}
      <div className="bg-[#f8fafb] border-b border-[#e0f2fe] py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm" aria-label="Breadcrumb">
            <Link to="/" className="text-[#64748b] hover:text-[#0891b2] transition-colors flex items-center gap-1 flex-shrink-0">
              <Home className="w-3 h-3 sm:w-4 sm:h-4" />Home
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#64748b] flex-shrink-0" />
            <span className="text-[#0891b2] font-medium">Search Results</span>
          </nav>
        </div>
      </div>

      {/* Search Header */}
      <div className="bg-gradient-to-br from-[#0891b2] to-[#14b8a6] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <SearchIcon className="w-8 h-8" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Search Results</h1>
            </div>
            <p className="text-lg sm:text-xl text-white/90">
              Searching for: <span className="font-semibold">"{query}"</span>
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full text-[#0891b2] font-medium">
              {loading ? 'Searching...' : `${results.length} ${results.length === 1 ? 'Result' : 'Results'} Found`}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
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
        ) : error ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a2332] mb-3">Search Error</h2>
            <p className="text-[#64748b] mb-6">{error}</p>
            <Link to="/rent" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-white rounded-xl hover:shadow-lg transition-all">
              Browse All Equipment
            </Link>
          </motion.div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resultsAsProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : query ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-[#e0f2fe] to-[#f0f9ff] rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-10 h-10 text-[#0891b2]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a2332] mb-3">No Results Found</h2>
            <p className="text-[#64748b] mb-6">We couldn't find any products matching "{query}". Try different keywords or browse our categories.</p>
            <Link to="/rent" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-white rounded-xl hover:shadow-lg transition-all">
              Browse All Equipment
            </Link>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#64748b]">Enter a search term to find products.</p>
          </div>
        )}
      </div>
    </div>
  );
};
