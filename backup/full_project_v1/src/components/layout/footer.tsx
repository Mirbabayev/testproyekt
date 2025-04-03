import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-16 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-white">HAQQIMIZDA</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/story" className="text-xs text-gray-400 hover:text-white transition-colors">Hekayəmiz</Link>
              </li>
              <li>
                <Link to="/labs" className="text-xs text-gray-400 hover:text-white transition-colors">Laboratoriyalar</Link>
              </li>
              <li>
                <Link to="/craftspeople" className="text-xs text-gray-400 hover:text-white transition-colors">Sənətkarlar</Link>
              </li>
              <li>
                <Link to="/responsibility" className="text-xs text-gray-400 hover:text-white transition-colors">Məsuliyyət</Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-white">KOLLEKSİYALARIMIZ</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/products" className="text-xs text-gray-400 hover:text-white transition-colors">Ətirlər</Link>
              </li>
              <li>
                <Link to="/home" className="text-xs text-gray-400 hover:text-white transition-colors">Ev ətriyyatları</Link>
              </li>
              <li>
                <Link to="/body" className="text-xs text-gray-400 hover:text-white transition-colors">Bədən qulluğu</Link>
              </li>
              <li>
                <Link to="/discovery" className="text-xs text-gray-400 hover:text-white transition-colors">Kəşf dəstləri</Link>
              </li>
            </ul>
          </div>

          {/* Client care */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-white">MÜŞTƏRİ XİDMƏTİ</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-xs text-gray-400 hover:text-white transition-colors">Əlaqə</Link>
              </li>
              <li>
                <Link to="/faq" className="text-xs text-gray-400 hover:text-white transition-colors">Tez-tez soruşulan suallar</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-xs text-gray-400 hover:text-white transition-colors">Çatdırılma</Link>
              </li>
              <li>
                <Link to="/returns" className="text-xs text-gray-400 hover:text-white transition-colors">Qaytarma siyasəti</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-white">BİZİMLƏ ƏLAQƏ</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-xs text-gray-400">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <a href="tel:+994501234567" className="hover:text-white transition-colors">+994 50 123 45 67</a>
              </li>
              <li className="flex items-center text-xs text-gray-400">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <a href="mailto:info@mirbabayev.az" className="hover:text-white transition-colors">info@mirbabayev.az</a>
              </li>
              <li className="flex items-start text-xs text-gray-400">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                <span>Bakı şəhəri, Nizami küçəsi 5</span>
              </li>
            </ul>
            
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-16 pt-12 pb-6">
          <div className="max-w-lg mx-auto">
            <h3 className="text-xs uppercase tracking-widest text-center mb-6 text-white">BİZDƏN XƏBƏRDAR OLUN</h3>
            <form className="flex">
              <input 
                type="email" 
                placeholder="E-poçt ünvanınız"
                className="lelabo-input flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
              <button className="lelabo-btn ml-2 whitespace-nowrap bg-white text-gray-900 hover:bg-gray-200">
                ABUNƏ OL
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © {currentYear} BY MIRBABAYEV. BÜTÜN HÜQUQLAR QORUNUR.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">Məxfilik Siyasəti</Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">İstifadə Şərtləri</Link>
            <Link to="/cookies" className="text-xs text-gray-500 hover:text-white transition-colors">Kuki Siyasəti</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};