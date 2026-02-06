import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-strong border-t border-[#e0f2fe] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0891b2] to-[#14b8a6] rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div>
                <div className="font-bold text-[#1a2332]">MedRent</div>
                <div className="text-xs text-[#64748b]">Medical Equipment</div>
              </div>
            </div>
            <p className="text-sm text-[#64748b] mb-4">
              Premium medical equipment rental services for hospitals, clinics, and home care.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 flex items-center justify-center glass-subtle rounded-lg hover:bg-[#0891b2] hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center glass-subtle rounded-lg hover:bg-[#0891b2] hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center glass-subtle rounded-lg hover:bg-[#0891b2] hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center glass-subtle rounded-lg hover:bg-[#0891b2] hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
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
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#64748b]">
                <Mail className="w-4 h-4 text-[#0891b2] flex-shrink-0" />
                <span>info@medrent.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#e0f2fe] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#64748b]">
            © 2026 MedRent. All rights reserved.
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
