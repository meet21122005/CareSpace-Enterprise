import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { EnquiryPopup } from './components/EnquiryPopup';
import { HomePage } from './pages/HomePage';
import { RentPage } from './pages/RentPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { FAQPage } from './pages/FAQPage';
import { LoginPage } from './pages/LoginPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy" element={<ComingSoon title="Privacy Policy" />} />
          <Route path="/terms" element={<ComingSoon title="Terms of Service" />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <EnquiryPopup />
      <ScrollToTop />
    </div>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-screen pt-12 md:pt-14 lg:pt-16 xl:pt-20 flex items-center justify-center">
      <div className="text-center glass-card rounded-2xl p-12 max-w-md mx-4">
        <h1 className="text-3xl font-bold text-[#1a2332] mb-4">{title}</h1>
        <p className="text-[#64748b]">This page is coming soon. Stay tuned!</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
        <Toaster position="top-right" richColors closeButton duration={4000} />
      </Router>
    </HelmetProvider>
  );
}
