import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, ChevronRight, Heart, ArrowRight, ArrowLeft, TrendingUp, Clock, Gift, Truck, Shield, User, Settings } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';
import { useAuth } from '../../lib/auth-context';

const brands = [
  { name: 'Chanel', slug: 'chanel' },
  { name: 'Dior', slug: 'dior' },
  { name: 'Tom Ford', slug: 'tom-ford' },
  { name: 'Yves Saint Laurent', slug: 'ysl' },
  { name: 'Jo Malone', slug: 'jo-malone' },
  { name: 'Giorgio Armani', slug: 'armani' },
  { name: 'Hermès', slug: 'hermes' },
  { name: 'Prada', slug: 'prada' },
  { name: 'Lancôme', slug: 'lancome' },
  { name: 'Byredo', slug: 'byredo' },
  { name: 'Guerlain', slug: 'guerlain' },
  { name: 'Creed', slug: 'creed' },
  { name: 'Maison Margiela', slug: 'maison-margiela' },
  { name: 'D&G', slug: 'dolce-gabbana' },
  { name: 'Le Labo', slug: 'le-labo' },
  { name: 'Amouage', slug: 'amouage' }
];

// Qoxu tipləri
const fragranceTypes = [
  { name: 'Çiçəkli', slug: 'floral' },
  { name: 'Odunsu', slug: 'woody' },
  { name: 'Sitrus', slug: 'citrus' },
  { name: 'Oriental', slug: 'oriental' },
  { name: 'Fougere', slug: 'fougere' }
];

export default function Home() {
  const { user, isAdmin } = useAuth();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [adminCheckDone, setAdminCheckDone] = useState(false);
  const [activeGender, setActiveGender] = useState('all');
  const [visibleProducts, setVisibleProducts] = useState<typeof products>([]);
  const [animateHero, setAnimateHero] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Admin rolunu yoxlayırıq
  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const admin = await isAdmin();
        setIsAdminUser(admin);
      } catch (error) {
        console.error('Admin rolu yoxlanılarkən xəta:', error);
        setIsAdminUser(false);
      } finally {
        setAdminCheckDone(true);
      }
    };
    
    if (user) {
      checkAdminRole();
    } else {
      setAdminCheckDone(true);
    }
  }, [isAdmin, user]);
  
  // Hero şəklin yüklənməsini idarə edən funksiya
  useEffect(() => {
    setAnimateHero(false);
    setImagesLoaded(false);
    
    const img = new Image();
    img.src = "https://creedboutique.com/cdn/shop/files/enhanced_2800x1875_eladaria.jpg?v=1742323470&width=2000";
    
    img.onload = () => {
      setImagesLoaded(true);
      setTimeout(() => setAnimateHero(true), 300);
    };
    
    img.onerror = () => {
      console.error("Şəkil yüklənə bilmədi");
      setImagesLoaded(true);
      setTimeout(() => setAnimateHero(true), 300);
    };
  }, []);
  
  // Parallax effekti üçün scroll pozisiyasını izləyirik
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // CSS stili React-in içində təyin etmək üçün 
  const marqueeStyle = {
    animation: 'marquee 50s linear infinite',
    animationPlayState: isPaused ? 'paused' : 'running',
  };
  
  // Cinsə görə məhsulları filtrləmə
  useEffect(() => {
    let filtered = [...products];
    
    if (activeGender !== 'all') {
      filtered = filtered.filter(product => product.gender === activeGender);
    }
    
    // Ən çox satılan məhsullar - popularitiyə görə top 8
    filtered = filtered.sort((a, b) => b.popularity - a.popularity).slice(0, 8);
    setVisibleProducts(filtered);
  }, [activeGender]);

  // Yeni məhsullar - ID'yə görə son əlavə olunmuş 4 məhsul
  const newProducts = [...products]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        {!imagesLoaded && (
          <div className="relative h-[90vh] bg-gray-100 flex items-center justify-center">
            <div className="animate-pulse w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        )}
        <div 
          className={`relative h-[90vh] transition-all duration-700 ${animateHero ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} ${!imagesLoaded ? 'hidden' : ''}`}
          style={{
            backgroundImage: `url("https://creedboutique.com/cdn/shop/files/enhanced_2800x1875_eladaria.jpg?v=1742323470&width=2000")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'opacity 0.7s ease, transform 1s ease',
          }}
          role="banner"
          aria-label="Ana səhifə hero bölməsi"
        >
          {/* Content Container */}
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            {/* Text Block - Moved left slightly */}
            <div className="text-left max-w-2xl" style={{ marginLeft: "45px" }}> 
              {/* Silindi: Introducing başlığı */}
              
              {/* Silindi: Eladaria başlığı */}
              
              {/* Silindi: Açıqlama mətni */}
              
              {/* Action Buttons - Silindi */}
              
            </div>
          </div>
        </div>
      </section>
      
      {/* Yeni Gələnlər Bölməsi - sonra yeni məhsulları göstəririk */}
      <section className="py-12 bg-accent/20">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-medium uppercase mb-2 tracking-wider">YENI GƏLƏNLƏR</h2>
            <div className="w-24 md:w-32 h-0.5 bg-black mx-auto mb-4"></div>
          </div>

          <div className="text-center mb-6">
            <Link to="/products?sort=newest" className="inline-flex items-center gap-2 text-black hover:text-gray-700 transition-all duration-300">
              <span className="text-lg font-medium">Hamısına baxın</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} size="small" />
            ))}
          </div>
        </div>
      </section>
      
      {/* Ən çox satılan məhsullar */}
      <section className="py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-medium uppercase mb-2 tracking-wider">ƏN ÇOX SATILAN ƏTIRLƏR</h2>
            <div className="w-24 md:w-32 h-0.5 bg-black mx-auto mb-4"></div>
          </div>
          
          {/* Cins filterləri - mobile görünüşdə daha yaxşı */}
          <div className="flex justify-center mb-6 overflow-x-auto scrollbar-hide">
            <div className="inline-flex">
              <button 
                className={`px-6 sm:px-10 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeGender === 'all' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => setActiveGender('all')}
              >
                HAMISI
              </button>
              <button 
                className={`px-6 sm:px-10 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeGender === 'qadın' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => setActiveGender('qadın')}
              >
                QADIN
              </button>
              <button 
                className={`px-6 sm:px-10 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeGender === 'kişi' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => setActiveGender('kişi')}
              >
                KIŞI
              </button>
              <button 
                className={`px-6 sm:px-10 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeGender === 'uniseks' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500 hover:text-black'
                }`}
                onClick={() => setActiveGender('uniseks')}
              >
                UNISEKS
              </button>
            </div>
          </div>
          
          <div className="text-center mb-10">
            <Link to="/products" className="inline-flex items-center gap-2 text-black hover:text-gray-700 transition-all duration-300">
              <span className="text-lg font-medium">Hamısına bax</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} size="small" />
            ))}
          </div>
        </div>
      </section>
      
      {/* Premium Brendlər */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-medium uppercase mb-2 tracking-wider">PREMIUM BRENDLƏR</h2>
            <div className="w-24 md:w-32 h-0.5 bg-black mx-auto mb-4"></div>
          </div>
        </div>
        
        <div className="brands-marquee">
          <div 
            className="flex justify-around items-center py-6 gap-8"
            style={marqueeStyle}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {brands.map((brand, index) => (
              <Link 
                key={brand.slug}
                to={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="font-didot text-xl md:text-2xl uppercase text-gold-600 hover:text-primary transition-colors duration-300 tracking-widest px-6 whitespace-nowrap"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Ətir Tövsiyəçisi paneli */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-widest mb-6">Sizə uyğun ətri tapmaqda çətinlik çəkirsiniz?</h2>
            <p className="text-gray-700 mb-8">
              Ətir Tövsiyəçimiz sizin tələblərinizə, yaşınıza, həyat tərzinizə və fəsil üstünlüklərinizə əsaslanan şəxsəlləşdirilmiş tövsiyələr təqdim edir.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/perfume-advisor" 
                className="lelabo-btn-black"
              >
                Ətir Tövsiyəçisi
              </a>
              <a 
                href="/products" 
                className="lelabo-btn"
              >
                Bütün Ətirlər
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Üstünlüklərimiz */}
      <section className="py-16 bg-gradient-to-b from-white to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-medium uppercase mb-2 tracking-wider">NIYƏ BIZI SEÇMƏLISINIZ?</h2>
            <div className="w-24 md:w-32 h-0.5 bg-black mx-auto mb-4"></div>
            <p className="text-gray-700 text-lg mb-8">Müştəri məmnuniyyəti bizim əsas məqsədimizdir</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="parfumbar-card p-8 text-center hover:border-primary/20 border-b-4 border-transparent hover:border-b-primary shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-6 transform transition-transform hover:scale-110">
                <TrendingUp className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Orijinal</h3>
              <p className="text-gray-600">Bütün məhsullar orijinallığına zəmanət verilir və birbaşa rəsmi distribütorlardan tədarük olunur.</p>
            </div>
            
            <div className="parfumbar-card p-8 text-center hover:border-primary/20 border-b-4 border-transparent hover:border-b-primary shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-6 transform transition-transform hover:scale-110">
                <Truck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sürətli Çatdırılma</h3>
              <p className="text-gray-600">Sifarişləriniz 1-3 iş günü ərzində ünvanınıza çatdırılır və çatdırılma prosesini izləyə bilərsiniz.</p>
            </div>
            
            <div className="parfumbar-card p-8 text-center hover:border-primary/20 border-b-4 border-transparent hover:border-b-primary shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-6 transform transition-transform hover:scale-110">
                <Gift className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pulsuz Nümunələr</h3>
              <p className="text-gray-600">Hər sifarişlə birlikdə yeni kolleksiyadan pulsuz ətir nümunələri hədiyyə edilir.</p>
            </div>
            
            <div className="parfumbar-card p-8 text-center hover:border-primary/20 border-b-4 border-transparent hover:border-b-primary shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-6 transform transition-transform hover:scale-110">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Təhlükəsiz Ödəniş</h3>
              <p className="text-gray-600">Bütün ödənişlər təhlükəsiz şəkildə həyata keçirilir və şəxsi məlumatlarınız qorunur.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
