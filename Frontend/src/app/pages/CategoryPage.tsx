import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Home, Filter, X } from 'lucide-react';
import { useCategory, useProductsByCategory, useCategories, useProducts } from '@/hooks';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';

export const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { category, loading: categoryLoading, error: categoryError } = useCategory(slug);
  const { products, loading: productsLoading } = useProductsByCategory(slug);
  const { categories, loading: categoriesLoading } = useCategories();
  const { products: allProducts, loading: allProductsLoading } = useProducts();

  const loading = categoryLoading || productsLoading || categoriesLoading || allProductsLoading;

  const handleCategorySelect = (categorySlug: string | null) => {
    if (categorySlug) {
      navigate(`/category/${categorySlug}`);
    } else {
      navigate('/rent');
    }
    setIsSidebarOpen(false);
  };

  if (categoryError || (!loading && !category)) {
    return (
      <div className="min-h-screen pt-12 md:pt-14 lg:pt-16 xl:pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1a2332] mb-4">Category not found</h1>
          <Link to="/rent" className="text-[#0891b2] hover:underline">Back to all products</Link>
        </div>
      </div>
    );
  }

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
            <Link to="/rent" className="text-[#64748b] hover:text-[#0891b2] transition-colors truncate">Rent</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#64748b] flex-shrink-0" />
            <span className="text-[#0891b2] font-medium truncate">{category?.name || 'Loading...'}</span>
          </nav>
        </div>
      </div>

      {/* Category Banner */}
      <div className="bg-gradient-to-br from-[#0891b2] to-[#14b8a6] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-white/30 rounded w-64 mx-auto" />
                <div className="h-6 bg-white/30 rounded w-96 mx-auto" />
              </div>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{category?.name}</h1>
                <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">{category?.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full text-[#0891b2] font-medium">
                  {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button onClick={() => setIsSidebarOpen(true)} variant="outline" className="w-full">
              <Filter className="w-5 h-5 mr-2" />
              Browse Categories
            </Button>
          </div>

          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#1a2332] mb-4">Equipment Categories</h3>
              {categoriesLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-12 bg-gray-200 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      !slug
                        ? 'bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-white shadow-lg'
                        : 'text-[#64748b] hover:bg-[#e0f2fe] hover:text-[#0891b2]'
                    }`}
                  >
                    All Equipment ({allProducts.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        slug === cat.slug
                          ? 'bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-white shadow-lg'
                          : 'text-[#64748b] hover:bg-[#e0f2fe] hover:text-[#0891b2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{cat.name}</span>
                        <span className="text-sm opacity-75">({cat.product_count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
                <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed left-0 top-0 bottom-0 w-80 glass-strong z-50 lg:hidden overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-[#1a2332]">Browse Categories</h3>
                      <button onClick={() => setIsSidebarOpen(false)} className="w-8 h-8 flex items-center justify-center glass-subtle rounded-lg">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <button onClick={() => handleCategorySelect(null)} className={`w-full text-left px-4 py-3 rounded-xl transition-all ${!slug ? 'bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-white shadow-lg' : 'text-[#64748b] hover:bg-[#e0f2fe] hover:text-[#0891b2]'}`}>
                        All Equipment ({allProducts.length})
                      </button>
                      {categories.map((cat) => (
                        <button key={cat.id} onClick={() => handleCategorySelect(cat.slug)} className={`w-full text-left px-4 py-3 rounded-xl transition-all ${slug === cat.slug ? 'bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-white shadow-lg' : 'text-[#64748b] hover:bg-[#e0f2fe] hover:text-[#0891b2]'}`}>
                          <div className="flex items-center justify-between">
                            <span>{cat.name}</span>
                            <span className="text-sm opacity-75">({cat.product_count})</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center">
                <p className="text-[#64748b] text-lg">No products available in this category at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
