import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X } from 'lucide-react';
import { useCategories, useProducts } from '@/hooks';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';

export const RentPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();

  const filteredProducts = selectedCategory
    ? products.filter(product => {
        const category = categories.find(c => c.slug === selectedCategory);
        return category && product.category_id === category.id;
      })
    : products;

  const handleCategorySelect = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setIsSidebarOpen(false);
  };

  const loading = categoriesLoading || productsLoading;

  return (
    <div className="min-h-screen pt-12 md:pt-14 lg:pt-16 xl:pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0891b2] to-[#14b8a6] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Medical Equipment Rental</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">Browse our complete catalog of premium medical equipment available for rent</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button onClick={() => setIsSidebarOpen(true)} variant="outline" className="w-full">
              <Filter className="w-5 h-5 mr-2" />
              Filter by Category
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
                      selectedCategory === null
                        ? 'bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-white shadow-lg'
                        : 'text-[#64748b] hover:bg-[#e0f2fe] hover:text-[#0891b2]'
                    }`}
                  >
                    All Equipment ({products.length})
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.slug)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        selectedCategory === category.slug
                          ? 'bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-white shadow-lg'
                          : 'text-[#64748b] hover:bg-[#e0f2fe] hover:text-[#0891b2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-sm opacity-75">({category.product_count})</span>
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
                      <h3 className="text-lg font-semibold text-[#1a2332]">Filter by Category</h3>
                      <button onClick={() => setIsSidebarOpen(false)} className="w-8 h-8 flex items-center justify-center glass-subtle rounded-lg">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <button onClick={() => handleCategorySelect(null)} className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedCategory === null ? 'bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-white shadow-lg' : 'text-[#64748b] hover:bg-[#e0f2fe] hover:text-[#0891b2]'}`}>
                        All Equipment ({products.length})
                      </button>
                      {categories.map((category) => (
                        <button key={category.id} onClick={() => handleCategorySelect(category.slug)} className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedCategory === category.slug ? 'bg-gradient-to-r from-[#0891b2] to-[#14b8a6] text-white shadow-lg' : 'text-[#64748b] hover:bg-[#e0f2fe] hover:text-[#0891b2]'}`}>
                          <div className="flex items-center justify-between">
                            <span>{category.name}</span>
                            <span className="text-sm opacity-75">({category.product_count})</span>
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
            <div className="mb-6">
              <p className="text-[#64748b]">
                Showing <span className="font-semibold text-[#1a2332]">{filteredProducts.length}</span> products
                {selectedCategory && (
                  <span> in <span className="font-semibold text-[#0891b2]">{categories.find(c => c.slug === selectedCategory)?.name}</span></span>
                )}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
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
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center">
                <p className="text-[#64748b] text-lg">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
