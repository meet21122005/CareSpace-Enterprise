import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-strong border-t border-[#e0f2fe] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="CareSpace Logo"
                className="h-12 w-auto object-contain drop-shadow-sm"
              />
              <div>
                <div className="font-bold text-[#1a2332]">CareSpace India</div>
                <div className="text-xs text-[#64748b]">Healthcare</div>
              </div>
            </div>
            <p className="text-sm text-[#64748b] mb-4">
              Premium medical equipment rental services for hospitals, clinics, and home care.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61582132743153"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="group w-10 h-10 flex items-center justify-center glass-subtle rounded-lg hover:bg-[#0891b2] hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook group-hover:animate-pulse"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://x.com/CareSpace_india"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="group w-10 h-10 flex items-center justify-center glass-subtle rounded-lg hover:bg-[#0891b2] hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter group-hover:animate-pulse"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/carespaceindia.healthcare"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="group w-10 h-10 flex items-center justify-center glass-subtle rounded-lg hover:bg-[#0891b2] hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram group-hover:animate-pulse"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/carespace-healthcare-2020ckpm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with us on LinkedIn"
                className="group w-10 h-10 flex items-center justify-center glass-subtle rounded-lg hover:bg-[#0891b2] hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin group-hover:animate-pulse"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#1a2332] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/rent" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
                  Browse Equipment
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-[#1a2332] mb-4">Popular Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/oxygen-concentrator" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
                  Oxygen Concentrators
                </Link>
              </li>
              <li>
                <Link to="/category/hospital-bed" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
                  Hospital Beds
                </Link>
              </li>
              <li>
                <Link to="/category/bipap" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
                  BiPAP Machines
                </Link>
              </li>
              <li>
                <Link to="/category/ventilator" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
                  Ventilators
                </Link>
              </li>
              <li>
                <Link to="/category/patient-monitor" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
                  Patient Monitors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#1a2332] mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-[#64748b]">
                <MapPin className="w-4 h-4 mt-0.5 text-[#0891b2] flex-shrink-0" />
                <span>Mumbai & Varanasi, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#64748b]">
                <Phone className="w-4 h-4 text-[#0891b2] flex-shrink-0" />
                <span>+91 8922069800</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#64748b]">
                <Mail className="w-4 h-4 text-[#0891b2] flex-shrink-0" />
                <span>Info.carespaceindia@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#e0f2fe] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#64748b]">
            © 2026 Carespace India. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-[#64748b] hover:text-[#0891b2] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
