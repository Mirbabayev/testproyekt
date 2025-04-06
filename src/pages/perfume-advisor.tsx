import React, { useState, useEffect } from 'react';
import { products, Product } from '../data/products';
import { 
  Droplet, 
  Sun, 
  Users, 
  Calendar, 
  Heart, 
  Clock, 
  Flag, 
  Umbrella, 
  X, 
  ThumbsUp, 
  MapPin,
  Home,
  Briefcase,
  Music,
  Coffee,
  Wine
} from 'lucide-react';

interface FormValues {
  gender: string;
  age: string;
  season: string;
  occasion: string;
  lifestyle: string;
}

const defaultFormValues: FormValues = {
  gender: '',
  age: '',
  season: '',
  occasion: '',
  lifestyle: ''
};

// Ətir tövsiyə sistemi üçün notlara əsasən filtrelemə
const getNotePreferencesByProfile = (profile: FormValues) => {
  // Yaş qruplarına görə uyğun notlar
  const notesByAge = {
    'young': ['Sitrus', 'Meyvə', 'Dəniz', 'Təzə', 'Çiçək'],
    'adult': ['Odunsu', 'Ədviyyəli', 'Çiçək', 'Şərq', 'Oriental'],
    'mature': ['Pudralı', 'Ədviyyəli', 'Odunsu', 'Balzamik', 'Zərif']
  };

  // Mövsümlərə görə uyğun notlar
  const notesBySeason = {
    'spring': ['Çiçək', 'Yaşıl', 'Sitrus', 'Təzə'],
    'summer': ['Dəniz', 'Sitrus', 'Meyvə', 'Təzə'],
    'autumn': ['Ədviyyəli', 'Odunsu', 'Balzamik', 'Oriental'],
    'winter': ['Odunsu', 'İsti', 'Şərq', 'Balzamik', 'Vanilli']
  };

  // Yaşam tərzinə görə uyğun notlar
  const notesByLifestyle = {
    'active': ['Təzə', 'Enerji verici', 'Sitrus', 'Dəniz'],
    'casual': ['Təzə', 'Odunsu', 'Ədviyyəli', 'Çiçək'],
    'elegant': ['Çiçək', 'Odunsu', 'Oriental', 'Pudralı'],
    'creative': ['Qeyri-adi', 'Meyvə', 'Ədviyyəli', 'Şərq']
  };

  // Gündəlik istifadəyə görə uyğun notlar
  const notesByOccasion = {
    'daily': ['Təzə', 'Sitrus', 'Təmiz', 'Yüngül'],
    'work': ['Yüngül', 'Təzə', 'Odunsu', 'Professional'],
    'evening': ['Şərq', 'İsti', 'Çiçək', 'Odunsu'],
    'special': ['İntens', 'Zəngin', 'Oriental', 'Dəbdəbəli']
  };

  // Profil parametrlərinə əsasən not seçimləri
  const ageGroup = profile.age === 'teen' || profile.age === '20s' ? 'young' : 
                  (profile.age === '30s' || profile.age === '40s' ? 'adult' : 'mature');
  
  const preferences = {
    byAge: notesByAge[ageGroup] || [],
    bySeason: notesBySeason[profile.season] || [],
    byLifestyle: notesByLifestyle[profile.lifestyle] || [],
    byOccasion: notesByOccasion[profile.occasion] || []
  };

  return preferences;
};

// Tövsiyeləri filtreləmək üçün alqoritm
const getFragranceRecommendations = (profile: FormValues, allProducts: Product[]): Product[] => {
  if (!profile.gender && !profile.age && !profile.season && !profile.lifestyle && !profile.occasion) {
    return [];
  }

  // Əsas gender filtrləməsi
  let filteredProducts = allProducts.filter(product => {
    if (profile.gender === 'male') return product.gender === 'kişi' || product.gender === 'uniseks';
    if (profile.gender === 'female') return product.gender === 'qadın' || product.gender === 'uniseks';
    return true;
  });

  // Not seçimlərinə görə uyğunluq balı hesablama
  const notePreferences = getNotePreferencesByProfile(profile);
  
  // Hər ətir üçün bal hesabla
  const scoredProducts = filteredProducts.map(product => {
    let score = 0;
    const allNotes = [...product.notes.top, ...product.notes.middle, ...product.notes.base];
    
    // Yaşa görə bal
    notePreferences.byAge.forEach(note => {
      if (allNotes.some(n => n.toLowerCase().includes(note.toLowerCase()))) {
        score += 10;
      }
    });
    
    // Mövsümə görə bal
    if (profile.season) {
      notePreferences.bySeason.forEach(note => {
        if (allNotes.some(n => n.toLowerCase().includes(note.toLowerCase()))) {
          score += 15;
        }
      });
    }
    
    // Yaşam tərzinə görə bal
    if (profile.lifestyle) {
      notePreferences.byLifestyle.forEach(note => {
        if (allNotes.some(n => n.toLowerCase().includes(note.toLowerCase()))) {
          score += 10;
        }
      });
    }
    
    // İstifadə məqsədinə görə bal
    if (profile.occasion) {
      notePreferences.byOccasion.forEach(note => {
        if (allNotes.some(n => n.toLowerCase().includes(note.toLowerCase()))) {
          score += 15;
        }
      });
    }
    
    // Populyarlıq balı
    score += (product.popularity / 10);
    
    return { product, score };
  });
  
  // Ən uyğun ətirlər (ən yüksək bal)
  const sortedProducts = scoredProducts
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
  
  return sortedProducts.slice(0, 5);
};

// Ətir Tövsiyəçisi
const PerfumeAdvisor: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmittedValues({...formValues});
    
    // Ətirlər üçün simulyasiya edilmiş API sorğusu yaradırıq
    setTimeout(() => {
      const results = getFragranceRecommendations(formValues, products);
      setRecommendations(results);
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setFormValues(defaultFormValues);
    setRecommendations([]);
    setShowResults(false);
    setSubmittedValues(null);
  };

  const getAgeText = (age: string) => {
    switch(age) {
      case 'teen': return '18 yaşdan aşağı';
      case '20s': return '20-29 yaş';
      case '30s': return '30-39 yaş';
      case '40s': return '40-49 yaş';
      case '50plus': return '50 yaş və üzəri';
      default: return '';
    }
  };

  const getGenderText = (gender: string) => {
    switch(gender) {
      case 'male': return 'Kişi';
      case 'female': return 'Qadın';
      default: return '';
    }
  };

  const getSeasonText = (season: string) => {
    switch(season) {
      case 'spring': return 'Yaz';
      case 'summer': return 'Yay';
      case 'autumn': return 'Payız';
      case 'winter': return 'Qış';
      default: return '';
    }
  };

  const getOccasionText = (occasion: string) => {
    switch(occasion) {
      case 'daily': return 'Gündəlik';
      case 'work': return 'İş';
      case 'evening': return 'Axşam';
      case 'special': return 'Xüsusi tədbirlər';
      default: return '';
    }
  };

  const getLifestyleText = (lifestyle: string) => {
    switch(lifestyle) {
      case 'active': return 'Aktiv';
      case 'casual': return 'Rahat';
      case 'elegant': return 'Elegant';
      case 'creative': return 'Yaradıcı';
      default: return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-light uppercase tracking-widest mb-4">Ətir Tövsiyəçisi</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Sizin şəxsi parametrlərinizə və üstünlüklərinizə əsaslanaraq ən uyğun ətrləri tapmağınıza kömək edəcəyik. Sadəcə aşağıdakı formu doldurun və sizə xüsusi tövsiyələr təqdim edəcəyik.
        </p>
      </div>

      {!showResults ? (
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Cins
              </label>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  value={formValues.gender}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  required
                >
                  <option value="">Seçin</option>
                  <option value="male">Kişi</option>
                  <option value="female">Qadın</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Users size={18} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Yaş qrupu
              </label>
              <div className="relative">
                <select
                  id="age"
                  name="age"
                  value={formValues.age}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  required
                >
                  <option value="">Seçin</option>
                  <option value="teen">18 yaşdan aşağı</option>
                  <option value="20s">20-29 yaş</option>
                  <option value="30s">30-39 yaş</option>
                  <option value="40s">40-49 yaş</option>
                  <option value="50plus">50 yaş və üzəri</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Clock size={18} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-1">
                Hansı mövsüm üçün ətir axtarırsınız?
              </label>
              <div className="relative">
                <select
                  id="season"
                  name="season"
                  value={formValues.season}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  required
                >
                  <option value="">Seçin</option>
                  <option value="spring">Yaz</option>
                  <option value="summer">Yay</option>
                  <option value="autumn">Payız</option>
                  <option value="winter">Qış</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">
                Əsasən hansı məqsəd üçün ətir axtarırsınız?
              </label>
              <div className="relative">
                <select
                  id="occasion"
                  name="occasion"
                  value={formValues.occasion}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  required
                >
                  <option value="">Seçin</option>
                  <option value="daily">Gündəlik istifadə</option>
                  <option value="work">İş mühiti</option>
                  <option value="evening">Axşam görüşləri</option>
                  <option value="special">Xüsusi tədbirlər</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Flag size={18} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700 mb-1">
                Yaşam tərzinizi necə təsvir edərdiniz?
              </label>
              <div className="relative">
                <select
                  id="lifestyle"
                  name="lifestyle"
                  value={formValues.lifestyle}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                  required
                >
                  <option value="">Seçin</option>
                  <option value="active">Aktiv, idman sevən</option>
                  <option value="casual">Rahat, sadə</option>
                  <option value="elegant">Elegant, dəbdəbəli</option>
                  <option value="creative">Yaradıcı, fərqli</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Heart size={18} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Ətirlər Axtarılır...
                  </span>
                ) : 'Ətir Tövsiyələrini Göstər'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm mx-auto animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Sizə Uyğun Ətirlər</h2>
            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700 flex items-center">
              <X size={16} className="mr-1" /> Yeni axtarış
            </button>
          </div>
          
          {submittedValues && (
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Axtarış parametrləriniz:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                {submittedValues.gender && (
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-gray-500" />
                    <span>{getGenderText(submittedValues.gender)}</span>
                  </div>
                )}
                {submittedValues.age && (
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-gray-500" />
                    <span>{getAgeText(submittedValues.age)}</span>
                  </div>
                )}
                {submittedValues.season && (
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span>{getSeasonText(submittedValues.season)}</span>
                  </div>
                )}
                {submittedValues.occasion && (
                  <div className="flex items-center">
                    <Flag size={16} className="mr-2 text-gray-500" />
                    <span>{getOccasionText(submittedValues.occasion)}</span>
                  </div>
                )}
                {submittedValues.lifestyle && (
                  <div className="flex items-center">
                    <Heart size={16} className="mr-2 text-gray-500" />
                    <span>{getLifestyleText(submittedValues.lifestyle)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {recommendations.length > 0 ? (
            <div className="space-y-6">
              {recommendations.map((product, index) => (
                <div key={product.id} className="flex flex-col md:flex-row border rounded-md overflow-hidden hover:shadow-md transition-shadow">
                  <div className="md:w-1/4 bg-white p-4 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-contain h-48 w-auto product-image"
                    />
                  </div>
                  <div className="md:w-3/4 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium">{product.name}</h3>
                        <p className="text-gray-500 text-sm">{product.brand} · {product.concentration} · {product.size}</p>
                      </div>
                      <span className="text-lg font-medium">{product.price} ₼</span>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-gray-700 text-sm line-clamp-2">{product.description}</p>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Üst notlar</h4>
                        <p className="text-sm">{product.notes.top.join(', ')}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Orta notlar</h4>
                        <p className="text-sm">{product.notes.middle.join(', ')}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Baza notlar</h4>
                        <p className="text-sm">{product.notes.base.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center">
                        <ThumbsUp size={16} className="text-primary mr-1" />
                        <span className="text-sm">{product.rating} reytinq</span>
                      </div>
                      <a 
                        href={`/product/${product.id}`} 
                        className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-900 transition-colors"
                      >
                        Ətraflı Bax
                      </a>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-8 bg-gray-50 p-6 rounded-md">
                <h3 className="text-lg font-medium mb-3">Sizin üçün tövsiyələr</h3>
                <p className="text-gray-700 mb-4">
                  Bu ətirlər parametrlərinizə və zövqünüzə ən uyğun olanlarıdır. Bütün tövsiyələrimiz sizin seçdiyiniz:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-700">
                  <li>Yaş qrupu: <span className="font-medium">{getAgeText(submittedValues?.age || '')}</span></li>
                  <li>Cins: <span className="font-medium">{getGenderText(submittedValues?.gender || '')}</span></li>
                  <li>Mövsüm: <span className="font-medium">{getSeasonText(submittedValues?.season || '')}</span></li>
                  <li>İstifadə məqsədi: <span className="font-medium">{getOccasionText(submittedValues?.occasion || '')}</span></li>
                  <li>Yaşam tərzi: <span className="font-medium">{getLifestyleText(submittedValues?.lifestyle || '')}</span></li>
                </ul>
                <p className="text-gray-700">
                  Daha çox tövsiyə almaq üçün yeni axtarış edə və ya parametrlərinizi dəyişdirə bilərsiniz.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Təəssüf ki, parametrlərinizə uyğun ətir tapa bilmədik.</p>
              <p className="text-gray-500 mb-4">Zövqünüzə uyğun ətirləri daha yaxşı müəyyən etmək üçün fərqli parametrlər seçməyi sınayın.</p>
              <button 
                onClick={resetForm}
                className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-900 transition-colors"
              >
                Yeni Axtarış
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PerfumeAdvisor; 