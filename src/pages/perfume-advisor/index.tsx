import { useState, useEffect } from 'react';
import { X, Filter, Search, ChevronDown, Heart, SparklesIcon, Sparkles, RefreshCw, Check } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';

// Məhsul tipini təyin edirik ki, TypeScript xətaları olmasın
interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  gender?: string;
  notes?: string;
  size?: string;
  category?: string;
  [key: string]: any; // Digər potensial sahələr üçün
}

// Animasiya və vizual effektlər üçün yeni komponent
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none opacity-20">
    <div className="absolute -top-48 -left-24 w-96 h-96 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full blur-3xl"></div>
    <div className="absolute top-1/4 -right-48 w-96 h-96 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full blur-3xl"></div>
  </div>
);

// Daha estetik və vizual PerfumeNote komponenti
const PerfumeNote = ({ title, notes }) => (
  <div className="flex flex-col mb-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-sm p-2 hover:shadow-sm transition-all duration-300">
    <span className="text-xs uppercase tracking-wider text-gray-500 mb-1">{title}</span>
    <div className="flex flex-wrap gap-1">
      {notes.map((note, idx) => (
        <span key={idx} className="text-xs px-2 py-1 bg-gray-50 rounded-sm text-gray-700">{note}</span>
      ))}
    </div>
  </div>
);

// Animasiyalı arxa plan üçün yeni komponent
const EnhancedAnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
    <div className="animated-bg-element"></div>
    <div className="animated-bg-element"></div>
    <div className="animated-bg-element"></div>
  </div>
);

// Qiymətləndirmə ulduzları üçün helper komponent
const StarRating = ({ rating }) => {
  const stars = [];
  const maxStars = 5;
  
  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span key={i} className={`text-xs ${i <= rating ? 'text-amber-400' : 'text-gray-300'}`}>
        ★
      </span>
    );
  }
  
  return <div className="flex space-x-0.5">{stars}</div>;
};

// Not məlumatlarının daha detallı təsviri üçün komponent
const NoteDetails = ({ topNotes, heartNotes, baseNotes }) => {
  return (
    <div className="mt-3 space-y-2 p-2 border border-gray-100 rounded-sm bg-white/70">
      <div className="info-tooltip">
        <div className="flex items-center text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-amber-300 mr-1"></span>
          <span className="uppercase tracking-wider">Üst notlar</span>
          <div className="tooltip-content">
            Üst notlar ətirin ilk qoxuduğunuz və ən uçucu olan hissəsidir. Adətən 15-30 dəqiqə davam edir.
          </div>
        </div>
        <p className="text-xs text-gray-700 ml-3">{topNotes}</p>
      </div>
      
      <div className="info-tooltip">
        <div className="flex items-center text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-rose-300 mr-1"></span>
          <span className="uppercase tracking-wider">Orta notlar</span>
          <div className="tooltip-content">
            Orta notlar ətirin "ürəyi"dir və üst notlar uçduqdan sonra ortaya çıxır. 2-4 saat davam edə bilər.
          </div>
        </div>
        <p className="text-xs text-gray-700 ml-3">{heartNotes}</p>
      </div>
      
      <div className="info-tooltip">
        <div className="flex items-center text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-blue-300 mr-1"></span>
          <span className="uppercase tracking-wider">Baza notlar</span>
          <div className="tooltip-content">
            Baza notlar ətirin əsasını təşkil edir və ən uzun müddət qalan qoxudur. Bir neçə saat və ya gün davam edə bilər.
          </div>
        </div>
        <p className="text-xs text-gray-700 ml-3">{baseNotes}</p>
      </div>
    </div>
  );
};

export default function PerfumeAdvisor() {
  // Form məlumatları üçün state
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    season: '',
    occasion: '',
    intensity: '',
  });
  
  // Əlavə parametrlər
  const [showResults, setShowResults] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStep, setSelectedStep] = useState(1);
  const [animateForm, setAnimateForm] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recommendationReason, setRecommendationReason] = useState<string[]>([]);
  
  // Məhsul detallı baxış üçün state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // Sıralama üçün state
  const [sortingOption, setSortingOption] = useState('new');
  
  // Animasiya üçün
  useEffect(() => {
    setAnimateForm(true);
  }, []);
  
  // Formu idarə etmək üçün funksiya
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Avtomatik olaraq növbəti mərhələyə keç
    if (name === 'gender') setSelectedStep(2);
    if (name === 'age') setSelectedStep(3);
    if (name === 'season') setSelectedStep(4);
  };
  
  // Formu təmizləmək funksiyası
  const handleReset = () => {
    setFormData({
      gender: '',
      age: '',
      season: '',
      occasion: '',
      intensity: '',
    });
    setShowResults(false);
    setRecommendedProducts([]);
    setSelectedStep(1);
  };
  
  // Formu göndərmək funksiyası
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Yüklənməni simulyasiya edirik - daha real təcrübə üçün
    setTimeout(() => {
      // Ətirlər arasında filter tətbiq edirik
      let filtered = [...products] as Product[];
      const reasons: string[] = [];
      
      // Cinsə görə filter
      if (formData.gender) {
        if (formData.gender === 'unisex') {
          filtered = filtered.filter(product => product.gender === 'uniseks');
          reasons.push('Uniseks parfüm tərcih etdiyinizə görə');
        } else {
          filtered = filtered.filter(product => product.gender === formData.gender);
          reasons.push(`${formData.gender === 'kişi' ? 'Kişi' : 'Qadın'} ətirləri arasından seçildi`);
        }
      }
      
      // Digər filterlər - burada real data olmadığı üçün sadə simulyasiya edirik
      // Yaşa görə (sadə simulyasiya)
      if (formData.age) {
        if (formData.age === '18-29') {
          filtered = filtered.filter(product => product.notes?.includes('fresh') || product.notes?.includes('citrus'));
          reasons.push('Gənc yaş qrupuna uyğun canlı notları olan ətirləri seçdik');
        } else if (formData.age === '30-39') {
          filtered = filtered.filter(product => product.notes?.includes('woody') || product.notes?.includes('spicy'));
          reasons.push('Yetkin zövqə uyğun odunsu və ədviyyəli notları olan ətirləri seçdik');
        } else if (formData.age === '40+') {
          filtered = filtered.filter(product => product.notes?.includes('classic') || product.notes?.includes('oriental'));
          reasons.push('Klassik və şərq notları olan ətirlər sizin yaş qrupunuza uyğundur');
        }
      }
      
      // Fəsilə görə (sadə simulyasiya)
      if (formData.season) {
        reasons.push(`${formData.season.charAt(0).toUpperCase() + formData.season.slice(1)} mövsümü üçün ideal ətirləri seçdik`);
        // Təsadüfi seçim - real datada bu parametrləri tədbiq etmək olar
        filtered = filtered.sort(() => 0.5 - Math.random());
      }
      
      if (formData.occasion) {
        reasons.push(`${formData.occasion === 'gündəlik' ? 'Gündəlik istifadə' : formData.occasion === 'iş' ? 'İş mühiti' : 'Xüsusi hadisələr'} üçün uyğundur`);
      }
      
      // Ən azı 1 məhsul olsun, əks halda random məhsullar göstər
      if (filtered.length === 0) {
        filtered = (products as Product[]).sort(() => 0.5 - Math.random()).slice(0, 4);
        reasons.push('Sizin üçün seçilmiş xüsusi ətirlər');
      }
      
      // Maksimum 4 məhsul göstər
      filtered = filtered.slice(0, 4);
      
      setRecommendedProducts(filtered);
      setRecommendationReason(reasons);
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };
  
  const toggleFavorite = (productId: string | number) => {
    setFavorites(prev => {
      if (prev.includes(String(productId))) {
        return prev.filter(id => id !== String(productId));
      } else {
        return [...prev, String(productId)];
      }
    });
  };
  
  // Məhsul detallarını göstərmək üçün funksiya
  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };
  
  // Detallı baxış modalını bağlamaq
  const closeProductDetails = () => {
    setShowDetailModal(false);
  };
  
  // Sıralama funksiyası
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortingOption(selectedOption);
    
    // Sıralamanı tətbiq et
    let sortedProducts = [...recommendedProducts];
    
    switch (selectedOption) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        // Random reytinqdən istifadə edirik, real layihədə əsl reytinqdən istifadə etmək lazımdır
        sortedProducts.sort(() => Math.random() - 0.5);
        break;
      case 'new':
        // Qəsdən ilk iki məhsul "yeni" olaraq işarələnib
        sortedProducts = sortedProducts.sort((a, b) => 
          recommendedProducts.indexOf(a) < 2 ? -1 : recommendedProducts.indexOf(b) < 2 ? 1 : 0
        );
        break;
    }
    
    setRecommendedProducts(sortedProducts);
  };
  
  return (
    <div className="perfume-advisor-container">
      <EnhancedAnimatedBackground />
      
      <div className="relative z-10">
        {/* Səhifə başlığı - daha vizual və cəlbedici */}
        <div className="py-6 bg-white/70 backdrop-blur-sm border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-center sparkle-effect">
                ƏTİR TÖVSİYƏÇİSİ
              </h1>
              <Sparkles className="w-5 h-5 text-amber-500 ml-2" />
            </div>
            <p className="text-center max-w-2xl mx-auto text-gray-600 text-sm">
              Sizin şəxsi parametrlərinizə əsaslanan xüsusi tövsiyələr üçün aşağıdakı formu doldurun.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin mb-4">
                <RefreshCw className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 animate-pulse">Sizə uyğun ətirləri seçirik...</p>
            </div>
          ) : showResults ? (
            // Tövsiyə olunan məhsullar - daha estetik və interaktiv təqdimat
            <div className="results-container">
              <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold sparkle-effect">SİZƏ UYĞUN ƏTİRLƏR</h2>
                  <span className="ml-2 bg-accent/30 text-xs py-1 px-2 rounded-sm">{recommendedProducts.length} ətir</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <select 
                      className="appearance-none bg-white border border-gray-200 text-xs py-1.5 pl-3 pr-8 rounded-sm focus:outline-none focus:border-black"
                      value={sortingOption}
                      onChange={handleSortChange}
                    >
                      <option value="new">Yenilər</option>
                      <option value="recommended">Tövsiyə edilən</option>
                      <option value="price-asc">Qiymət: aşağıdan yuxarıya</option>
                      <option value="price-desc">Qiymət: yuxarıdan aşağıya</option>
                      <option value="rating">Reyting</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                  <button 
                    onClick={handleReset}
                    className="flex items-center text-sm bg-black text-white px-3 py-1 rounded-sm hover:bg-black/80 transition-colors"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Yeni axtarış
                  </button>
                </div>
              </div>
              
              {/* Tövsiyə səbəbləri */}
              <div className="mb-6 p-3 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-sm">
                <div className="flex items-center mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500 mr-2" />
                  <h3 className="text-sm font-medium">Niyə bu ətirlər sizə uyğundur:</h3>
                </div>
                <ul className="text-sm text-gray-600 pl-6 list-disc space-y-1">
                  {recommendationReason.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {recommendedProducts.map((product, index) => (
                  <div key={product.id} className="group relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-sm overflow-hidden hover:shadow-md transition-all duration-300">
                    <button 
                      className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(String(product.id)) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                    
                    {/* Yeni başlığı */}
                    {index < 2 && (
                      <div className="absolute top-2 left-2 z-10 bg-black text-white text-xs py-1 px-2 rounded-sm">
                        YENİ
                      </div>
                    )}
                    
                    <div className="p-4">
                      <div className="mb-4 h-40 flex items-center justify-center">
                        <img 
                          src={product.image || '/images/placeholder.jpg'} 
                          alt={product.name}
                          className="max-h-full max-w-full object-contain mix-blend-multiply"
                        />
                      </div>
                      
                      <div className="pt-2 border-t">
                        <h3 className="text-sm font-medium uppercase tracking-wide truncate">{product.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm font-medium">{product.price} ₼</p>
                          <div className="flex items-center">
                            <StarRating rating={Math.floor(Math.random() * 5) + 1} />
                          </div>
                        </div>
                        
                        {/* Ətirlə bağlı əlavə məlumat */}
                        <div className="mt-3 pt-2 border-t">
                          {product.notes && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {product.notes.split(',').slice(0, 3).map((note, idx) => (
                                <span key={idx} className="inline-block text-xs px-1.5 py-0.5 bg-accent/10 text-gray-600 rounded-sm">
                                  {note.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <button 
                            className="bg-black text-white text-xs py-2 rounded-sm hover:bg-black/80 transition-colors flex items-center justify-center"
                            onClick={() => showProductDetails(product)}
                          >
                            ƏTRAFLƏ BAX
                          </button>
                          <button className="border border-black text-black text-xs py-2 rounded-sm hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                            TÖVSİYƏ ET
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 text-amber-500 mr-2" />
                  Tövsiyələrimiz haqqında
                </h3>
                <p className="text-gray-600 text-sm">
                  Bu tövsiyələr sizin seçdiyiniz parametrlərə əsaslanan ilkin təkliflərdir. 
                  Daha dəqiq məlumatlar üçün mağazalarımızı ziyarət edə və mütəxəssislərimizdən fərdi məsləhət ala bilərsiniz.
                </p>
              </div>
            </div>
          ) : (
            // Axtarış formu - daha modern və interaktiv
            <div className={`bg-white/90 backdrop-blur-sm rounded-sm shadow-sm border p-5 max-w-3xl mx-auto ${animateForm ? 'animate-fadeIn' : 'opacity-0'}`}>
              <div className="flex items-center mb-5 text-gray-800 pb-2 border-b">
                <Filter className="w-4 h-4 mr-2" />
                <h2 className="text-xl font-semibold">ŞƏXSİ ƏTİR SEÇİMİ</h2>
              </div>
              
              {/* Addım göstəriciləri */}
              <div className="step-indicators mb-6">
                <div className={`step-indicator-dot ${selectedStep >= 1 ? 'active' : ''} ${selectedStep > 1 ? 'completed' : ''}`}></div>
                <div className={`step-indicator-dot ${selectedStep >= 2 ? 'active' : ''} ${selectedStep > 2 ? 'completed' : ''}`}></div>
                <div className={`step-indicator-dot ${selectedStep >= 3 ? 'active' : ''} ${selectedStep > 3 ? 'completed' : ''}`}></div>
                <div className={`step-indicator-dot ${selectedStep >= 4 ? 'active' : ''} ${selectedStep > 4 ? 'completed' : ''}`}></div>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Cinsiyyət seçimi - Addım 1 */}
                <div className={`mb-6 ${selectedStep === 1 ? 'block' : 'hidden'}`}>
                  <label className="block text-sm font-medium mb-2">Cinsiyyət</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className={`option-card ${formData.gender === 'kişi' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="gender"
                        value="kişi"
                        checked={formData.gender === 'kişi'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>Kişi</span>
                        {formData.gender === 'kişi' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                    
                    <label className={`option-card ${formData.gender === 'qadın' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="gender"
                        value="qadın"
                        checked={formData.gender === 'qadın'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>Qadın</span>
                        {formData.gender === 'qadın' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                    
                    <label className={`option-card ${formData.gender === 'unisex' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="gender"
                        value="unisex"
                        checked={formData.gender === 'unisex'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>Uniseks</span>
                        {formData.gender === 'unisex' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Yaş qrupu - Addım 2 */}
                <div className={`mb-6 ${selectedStep === 2 ? 'block' : 'hidden'}`}>
                  <label className="block text-sm font-medium mb-2">Yaş qrupu</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className={`option-card ${formData.age === '18-29' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="age"
                        value="18-29"
                        checked={formData.age === '18-29'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>18-29</span>
                        {formData.age === '18-29' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                    
                    <label className={`option-card ${formData.age === '30-39' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="age"
                        value="30-39"
                        checked={formData.age === '30-39'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>30-39</span>
                        {formData.age === '30-39' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                    
                    <label className={`option-card ${formData.age === '40+' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="age"
                        value="40+"
                        checked={formData.age === '40+'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>40+</span>
                        {formData.age === '40+' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Mövsüm - Addım 3 */}
                <div className={`mb-6 ${selectedStep === 3 ? 'block' : 'hidden'}`}>
                  <label className="block text-sm font-medium mb-2">Hansı mövsüm üçün?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className={`option-card ${formData.season === 'yaz' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="season"
                        value="yaz"
                        checked={formData.season === 'yaz'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>Yaz</span>
                        {formData.season === 'yaz' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                    
                    <label className={`option-card ${formData.season === 'yay' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="season"
                        value="yay"
                        checked={formData.season === 'yay'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>Yay</span>
                        {formData.season === 'yay' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                    
                    <label className={`option-card ${formData.season === 'payız' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="season"
                        value="payız"
                        checked={formData.season === 'payız'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>Payız</span>
                        {formData.season === 'payız' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                    
                    <label className={`option-card ${formData.season === 'qış' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="season"
                        value="qış"
                        checked={formData.season === 'qış'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>Qış</span>
                        {formData.season === 'qış' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Hansı məqsəd üçün - Addım 4 */}
                <div className={`mb-6 ${selectedStep === 4 ? 'block' : 'hidden'}`}>
                  <label className="block text-sm font-medium mb-2">Hansı məqsəd üçün?</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className={`option-card ${formData.occasion === 'gündəlik' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="occasion"
                        value="gündəlik"
                        checked={formData.occasion === 'gündəlik'}
                        onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>Gündəlik</span>
                        {formData.occasion === 'gündəlik' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                    
                    <label className={`option-card ${formData.occasion === 'iş' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="occasion"
                        value="iş"
                        checked={formData.occasion === 'iş'}
                        onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>İş mühiti</span>
                        {formData.occasion === 'iş' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                    
                    <label className={`option-card ${formData.occasion === 'xüsusi' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="occasion"
                        value="xüsusi"
                        checked={formData.occasion === 'xüsusi'}
                        onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <span>Xüsusi hadisə</span>
                        {formData.occasion === 'xüsusi' && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="divider"></div>
                
                {/* Naviqasiya düymələri */}
                <div className="flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setSelectedStep(prev => Math.max(prev - 1, 1))} 
                    className="px-4 py-2 border border-gray-300 rounded-sm text-sm hover:bg-gray-50 transition-colors"
                    disabled={selectedStep === 1}
                  >
                    Əvvəlki
                  </button>
                  
                  {selectedStep < 4 ? (
                    <button 
                      type="button" 
                      onClick={() => setSelectedStep(prev => Math.min(prev + 1, 4))} 
                      className="px-4 py-2 bg-black text-white rounded-sm text-sm hover:bg-black/80 transition-colors"
                    >
                      Növbəti
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-black text-white rounded-sm text-sm hover:bg-black/80 transition-colors"
                    >
                      Ətirləri göstər
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      
      {/* Məhsul detallı baxış modalı */}
      {showDetailModal && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50" onClick={closeProductDetails}></div>
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative bg-white max-w-2xl w-full mx-auto rounded-sm shadow-lg animate-fadeIn max-h-[90vh] overflow-y-auto">
              <button 
                className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-black transition-colors"
                onClick={closeProductDetails}
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <img 
                      src={selectedProduct.image || '/images/placeholder.jpg'} 
                      alt={selectedProduct.name}
                      className="max-h-48 object-contain mix-blend-multiply"
                    />
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-medium uppercase tracking-wide">{selectedProduct.name}</h2>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xl font-medium">{selectedProduct.price} ₼</span>
                      <div className="flex items-center">
                        <StarRating rating={Math.floor(Math.random() * 5) + 1} />
                        <span className="text-xs ml-1 text-gray-500">(12 rəy)</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium">Təsvir</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedProduct.description || 'Bu ətir, xüsusi anlarınızı vurğulamaq üçün hazırlanmış zərif və uzunömürlü bir qoxudur. Gündəlik istifadə və xüsusi tədbirlər üçün idealdir.'}
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium">Ətir notları</h3>
                      <NoteDetails 
                        topNotes={selectedProduct.notes?.split(',').slice(0, 2).join(', ') || 'Bergamot, Limon, Portağal'}
                        heartNotes={selectedProduct.notes?.split(',').slice(2, 4).join(', ') || 'Yasəmən, Qızılgül, Müşk'}
                        baseNotes={selectedProduct.notes?.split(',').slice(4, 6).join(', ') || 'Sədəf, Ağac, Vanille'}
                      />
                    </div>
                    
                    <div className="mt-6 flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="border border-gray-200 p-2 rounded-sm">
                          <span className="text-xs text-gray-500">Ətir tipi</span>
                          <p className="text-sm font-medium">{selectedProduct.category || 'Eau de Parfum'}</p>
                        </div>
                        <div className="border border-gray-200 p-2 rounded-sm">
                          <span className="text-xs text-gray-500">Həcm</span>
                          <p className="text-sm font-medium">{selectedProduct.size || '100ml'}</p>
                        </div>
                      </div>
                      <button className="mt-4 w-full bg-black text-white py-2 rounded-sm hover:bg-black/80 transition-colors">
                        SƏBƏTƏ ƏLAVƏ ET
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 