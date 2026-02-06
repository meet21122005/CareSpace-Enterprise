import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, MapPin, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { productsApi } from '@/services/api';
import { getProductImageUrl } from '@/utils/images';
import type { ProductSearchResult } from '@/types';

// ============================================================================
// TYPES
// ============================================================================

interface NavLink {
  label: string;
  href: string;
}

interface City {
  id: string;
  name: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Rent', href: '/rent' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const CITIES: City[] = [
  { id: '1', name: 'Mumbai' },
  { id: '2', name: 'Thane' },
  { id: '3', name: 'Navi Mumbai' },
  { id: '4', name: 'Varanasi' },
  { id: '5', name: 'Delhi' },
  { id: '6', name: 'Bangalore' },
  { id: '7', name: 'Chennai' },
  { id: '8', name: 'Kolkata' },
  { id: '9', name: 'Hyderabad' },
  { id: '10', name: 'Pune' },
];

// ============================================================================
// MAIN NAVBAR COMPONENT
// ============================================================================

export const Navbar = () => {
  // ===== State Management =====
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductSearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);

  // ===== Refs =====
  const searchRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  // ===== Scroll Detection =====
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ===== Close Mobile Menu on Resize =====
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // ===== Prevent Body Scroll When Mobile Menu Open =====
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // ===== Click Outside Handler =====
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close search dropdown
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }

      // Close city dropdown
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCityDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ===== Keyboard Navigation =====
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCityDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ===== Debounced Search =====
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);

    // Clear previous timeout
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timeout for debounced search
    debounceTimerRef.current = setTimeout(async () => {
      if (value.trim().length > 0) {
        try {
          const results = await productsApi.search(value);
          setSearchResults(results.slice(0, 5)); // Show top 5 results
          setIsSearchOpen(true);
        } catch (error) {
          console.error('Search failed:', error);
          setSearchResults([]);
          setIsSearchOpen(false);
        }
      } else {
        setSearchResults([]);
        setIsSearchOpen(false);
      }
    }, 300);
  }, []);

  // ===== Cleanup Debounce Timer =====
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // ===== Toggle Handlers =====
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen((prev) => !prev);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? 'h-16 md:h-18 lg:h-20 backdrop-blur-xl bg-white/80 shadow-lg border-b border-gray-200/50'
              : 'h-16 md:h-18 lg:h-20 xl:h-24 backdrop-blur-md bg-white/70'
          }
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Container with Max Width and Responsive Padding */}
        <div className="h-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="h-full flex items-center justify-between gap-2 sm:gap-4">
            {/* ===== LEFT: Logo ===== */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group"
              aria-label="CareSpace Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <img
                  src="/logo.png"
                  alt="CareSpace Logo"
                  className="h-12 w-auto md:h-16 lg:h-20 object-contain drop-shadow-sm"
                />
                <div className="flex flex-col sm:flex-col">
                  <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent leading-tight">
                    CareSpace India
                  </div>
                  <div className="text-xs sm:text-xs md:text-sm lg:text-base font-medium text-blue-600 tracking-wide">
                    Healthcare
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* ===== CENTER: Desktop Nav Links & Search ===== */}
            <div className="hidden md:flex items-center gap-4 xl:gap-6 flex-1 max-w-3xl mx-4 xl:mx-6">
              {/* Nav Links */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative px-3 py-2 text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors group whitespace-nowrap"
                  >
                    {link.label}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-blue-600"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                ))}
              </nav>

              {/* Desktop Search Bar */}
              <div className="flex-1 max-w-sm md:max-w-md lg:max-w-lg relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search equipment..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full h-10 pl-10 pr-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      aria-label="Search medical equipment"
                    />
                  </div>
                </form>

                {/* Desktop Search Results Dropdown */}
                <AnimatePresence>
                  {isSearchOpen && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 left-0 right-0 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:w-96 bg-white backdrop-blur-xl border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.slug}`}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <img
                              src={getProductImageUrl(product.image_url, product.slug)}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg bg-gradient-to-br from-blue-50 to-blue-100"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-gray-900 truncate">
                                {product.name}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {product.category_name}
                              </div>
                            </div>
                            <div className="text-sm font-bold text-blue-600 whitespace-nowrap">
                              ₹{product.price_1month?.toLocaleString()}/mo
                            </div>
                          </Link>
                        ))}
                        {searchQuery && (
                          <button
                            onClick={handleSearchSubmit}
                            className="w-full p-3 text-center text-sm font-medium text-blue-600 hover:bg-gray-50 transition-colors"
                          >
                            View all results for "{searchQuery}"
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ===== RIGHT: City Selector, Icons, User (Desktop) ===== */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0">
              {/* City Selector */}
              <div className="relative" ref={cityDropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleCityDropdown}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg hover:border-blue-300 transition-all text-sm whitespace-nowrap"
                  aria-label={`Selected city: ${selectedCity.name}`}
                  aria-expanded={isCityDropdownOpen}
                >
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 max-w-[100px] truncate">
                    {selectedCity.name}
                  </span>
                  <motion.svg
                    className="w-4 h-4 text-gray-400 transition-transform flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isCityDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>

                {/* City Dropdown */}
                <AnimatePresence>
                  {isCityDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 w-56 bg-white backdrop-blur-xl border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      {CITIES.map((city) => (
                        <button
                          key={city.id}
                          onClick={() => handleCitySelect(city)}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                            selectedCity.id === city.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="font-medium text-sm text-gray-900">
                            {city.name}
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist Icon */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-gray-700" />
              </motion.button>

              {/* User Profile */}
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="User profile"
                >
                  <User className="w-5 h-5 text-gray-700" />
                </motion.button>
              </Link>
            </div>

            {/* ===== RIGHT: Mobile Menu Toggle ===== */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={toggleMobileMenu}
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl z-40 md:hidden overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search equipment..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 bg-white border border-gray-200 rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      aria-label="Search medical equipment"
                    />
                  </div>
                </form>

                {/* Mobile Search Results */}
                {searchQuery && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="max-h-60 overflow-y-auto">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-white transition-colors border-b border-gray-200 last:border-b-0"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <img
                            src={getProductImageUrl(product.image_url, product.slug)}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg bg-gradient-to-br from-blue-50 to-blue-100"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-900 truncate">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {product.category_name}
                            </div>
                          </div>
                          <div className="text-sm font-bold text-blue-600 whitespace-nowrap">
                            ₹{product.price_1month?.toLocaleString()}/mo
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Mobile City Selector */}
                <div className="md:hidden">
                  <button
                    onClick={toggleCityDropdown}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-all"
                    aria-label={`Selected city: ${selectedCity.name}`}
                    aria-expanded={isCityDropdownOpen}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {selectedCity.name}
                        </div>
                      </div>
                    </div>
                    <motion.svg
                      className="w-5 h-5 text-gray-400 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: isCityDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>

                  {/* Mobile City Dropdown */}
                  <AnimatePresence>
                    {isCityDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden"
                      >
                        {CITIES.map((city) => (
                          <button
                            key={city.id}
                            onClick={() => handleCitySelect(city)}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                              selectedCity.id === city.id ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="font-medium text-sm text-gray-900">
                              {city.name}
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Nav Links */}
                <motion.nav
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.05 },
                    },
                  }}
                  className="space-y-1"
                >
                  {NAV_LINKS.map((link) => (
                    <motion.div
                      key={link.href}
                      variants={{
                        closed: { opacity: 0, x: -20 },
                        open: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        to={link.href}
                        onClick={toggleMobileMenu}
                        className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                {/* Mobile Action Buttons */}
                <div className="pt-4 border-t border-gray-200 grid grid-cols-3 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart className="w-6 h-6 text-gray-700" />
                    <span className="text-xs text-gray-600">Wishlist</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                    aria-label="Shopping cart"
                  >
                    <User className="w-6 h-6 text-gray-700" />
                    <span className="text-xs text-gray-600">Cart</span>
                  </motion.button>

                  <Link to="/login" onClick={toggleMobileMenu}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-2 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                      aria-label="User profile"
                    >
                      <User className="w-6 h-6 text-gray-700" />
                      <span className="text-xs text-gray-600">Profile</span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 md:h-18 lg:h-20 xl:h-24" aria-hidden="true" />
    </>
  );
};
