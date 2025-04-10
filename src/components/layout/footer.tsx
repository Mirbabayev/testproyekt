import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12">
          {/* HAQQIMIZDA */}
          <div>
            <h3 className="text-sm font-medium mb-6 tracking-wider">HAQQIMIZDA</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                  Hekayəmiz
                </Link>
              </li>
              <li>
                <Link to="/labs" className="text-gray-400 hover:text-white text-sm">
                  Laboratoriyalar
                </Link>
              </li>
              <li>
                <Link to="/artists" className="text-gray-400 hover:text-white text-sm">
                  Sənətkarlar
                </Link>
              </li>
              <li>
                <Link to="/responsibility" className="text-gray-400 hover:text-white text-sm">
                  Məsuliyyət
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLLEKSİYALARIMIZ */}
          <div>
            <h3 className="text-sm font-medium mb-6 tracking-wider">KOLLEKSİYALARIMIZ</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/perfumes" className="text-gray-400 hover:text-white text-sm">
                  Ətirlər
                </Link>
              </li>
              <li>
                <Link to="/home-fragrances" className="text-gray-400 hover:text-white text-sm">
                  Ev ətriyyatları
                </Link>
              </li>
              <li>
                <Link to="/body-care" className="text-gray-400 hover:text-white text-sm">
                  Bədən qulluğu
                </Link>
              </li>
              <li>
                <Link to="/discovery-sets" className="text-gray-400 hover:text-white text-sm">
                  Kəşf dəstləri
                </Link>
              </li>
            </ul>
          </div>

          {/* MÜŞTƏRİ XİDMƏTİ */}
          <div>
            <h3 className="text-sm font-medium mb-6 tracking-wider">MÜŞTƏRİ XİDMƏTİ</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm">
                  Əlaqə
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white text-sm">
                  Tez-tez soruşulan suallar
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white text-sm">
                  Çatdırılma
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white text-sm">
                  Qaytarma
                </Link>
              </li>
            </ul>
          </div>

          {/* ƏLAQƏ */}
          <div>
            <h3 className="text-sm font-medium mb-6 tracking-wider">ƏLAQƏ</h3>
            <ul className="space-y-3">
              <li>
                <p className="text-gray-400 text-sm">Ünvan: Bakı şəh., Nizami küç. 12</p>
              </li>
              <li>
                <p className="text-gray-400 text-sm">Tel: +994 50 123 45 67</p>
              </li>
              <li>
                <p className="text-gray-400 text-sm">E-mail: info@easyparf.az</p>
              </li>
              <li className="flex space-x-4 pt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt hissə */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} EasyParfum. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
};