import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCompare } from '../../lib/compare-context';
import { useCart } from '../../lib/cart-context';
import { X, ShoppingBag, Trash2, ChevronLeft, ArrowUpDown, SlidersHorizontal, CheckCircle2, XCircle, ChevronDown, ChevronUp, Eye } from 'lucide-react';

// Müqayisə səhifəsi komponenti
export default function ComparePage() {
  const navigate = useNavigate();
  const { items, removeFromCompare } = useCompare();
  const { addToCart } = useCart();
  
  // Müqayisə parametrləri
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [analysisOpen, setAnalysisOpen] = useState(true);
  const [selectedFeatures, setSelectedFeatures] = useState<CompareFeatureType[]>([
    'brand', 'gender', 'price', 'concentration', 'size', 
    'topNotes', 'middleNotes', 'baseNotes', 'longevity', 'sillage'
  ]);
  
  // Xüsusiyyətləri səliqəli göstərmək üçün funksiyalar
  const formatNotesArray = (notes?: string[]): string => {
    return notes && notes.length > 0 ? notes.join(', ') : '-';
  };
  
  // Array tipli dəyərləri formatlayır
  const formatArray = (arr?: string[]) => {
    if (!arr || arr.length === 0) return '-';
    return arr.join(', ');
  };
  
  // Xüsusiyyət etiketləri
  const featureLabels: Record<string, string> = {
    gender: 'Cins',
    brand: 'Brend',
    price: 'Qiymət',
    concentration: 'Konsentrasiya',
    size: 'Həcm',
    ageGroup: 'Yaş qrupu',
    timeOfUse: 'İstifadə vaxtı',
    season: 'Fəsil',
    style: 'Üslub',
    longevity: 'Qalıcılıq',
    sillage: 'Yayılma',
    topNotes: 'Yuxarı notlar',
    middleNotes: 'Orta notlar',
    baseNotes: 'Baza notlar'
  };
  
  // Xüsusiyyəti seçmək/seçimi ləğv etmək
  const toggleFeature = (feature: CompareFeatureType) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };
  
  // Sətirin göstərilib-göstərilməyəcəyini təyin edir
  const shouldShowRow = (feature: CompareFeatureType): boolean => {
    if (!showDifferencesOnly) return true;
    
    // Əgər yalnız fərqləri göstərmək lazımdırsa, o zaman məhsullar arasında fərq olub-olmadığını yoxlayırıq
    if (feature === 'topNotes' || feature === 'middleNotes' || feature === 'baseNotes') {
      const notesPath = feature === 'topNotes' ? 'top' : feature === 'middleNotes' ? 'middle' : 'base';
      return items.some((item, i, arr) => 
        i > 0 && item.notes?.[notesPath] && arr[0].notes?.[notesPath] && 
        JSON.stringify([...(item.notes[notesPath] || [])].sort()) !== JSON.stringify([...(arr[0].notes[notesPath] || [])].sort())
      );
    }
    
    if (feature === 'timeOfUse' || feature === 'season' || feature === 'style') {
      return items.some((item, i, arr) => 
        i > 0 && item[feature] && arr[0][feature] && 
        JSON.stringify([...(item[feature] || [])].sort()) !== JSON.stringify([...(arr[0][feature] || [])].sort())
      );
    }
    
    return items.some((item, i, arr) => i > 0 && item[feature] !== arr[0][feature]);
  };
  
  // Məhsulların müqayisəsi analizi
  const analysis = useMemo(() => {
    if (items.length < 2) return null;
    
    const similarities: { feature: string; value: string }[] = [];
    const differences: { feature: string; values: Record<string, string> }[] = [];
    
    // Xüsusiyyətləri müqayisə et
    Object.entries(featureLabels).forEach(([key, label]) => {
      const feature = key as keyof typeof items[0];
      
      if (key === 'topNotes' || key === 'middleNotes' || key === 'baseNotes') {
        const notesPath = key === 'topNotes' ? 'top' : key === 'middleNotes' ? 'middle' : 'base';
        
        const allSame = !items.some((item, i, arr) => 
          i > 0 && item.notes?.[notesPath] && arr[0].notes?.[notesPath] && 
          JSON.stringify([...(item.notes[notesPath] || [])].sort()) !== JSON.stringify([...(arr[0].notes[notesPath] || [])].sort())
        );
        
        if (allSame && items[0].notes?.[notesPath]?.length) {
          similarities.push({
            feature: label,
            value: items[0].notes[notesPath].join(', ')
          });
        } else {
          const noteValues: Record<string, string> = {};
          items.forEach(item => {
            noteValues[item.name] = item.notes?.[notesPath]?.length 
              ? item.notes[notesPath].join(', ') 
              : '-';
          });
          
          if (Object.values(noteValues).some(val => val !== '-')) {
            differences.push({
              feature: label,
              values: noteValues
            });
          }
        }
        return;
      }
      
      if (key === 'timeOfUse' || key === 'season' || key === 'style') {
        const allSame = !items.some((item, i, arr) => 
          i > 0 && item[feature] && arr[0][feature] && 
          JSON.stringify([...(item[feature] || [])].sort()) !== JSON.stringify([...(arr[0][feature] || [])].sort())
        );
        
        if (allSame && items[0][feature]?.length) {
          similarities.push({
            feature: label,
            value: (items[0][feature] as string[]).join(', ')
          });
        } else {
          const values: Record<string, string> = {};
          items.forEach(item => {
            values[item.name] = (item[feature] as string[])?.length 
              ? (item[feature] as string[]).join(', ') 
              : '-';
          });
          
          if (Object.values(values).some(val => val !== '-')) {
            differences.push({
              feature: label,
              values
            });
          }
        }
        return;
      }
      
      // Digər xüsusiyyətlər üçün
      const allSame = !items.some((item, i, arr) => i > 0 && item[feature] !== arr[0][feature]);
      
      if (allSame && items[0][feature]) {
        similarities.push({
          feature: label,
          value: key === 'price' ? `${items[0][feature]} ₼` : String(items[0][feature])
        });
      } else {
        const values: Record<string, string> = {};
        items.forEach(item => {
          values[item.name] = item[feature] 
            ? (key === 'price' ? `${item[feature]} ₼` : String(item[feature])) 
            : '-';
        });
        
        if (Object.values(values).some(val => val !== '-')) {
          differences.push({
            feature: label,
            values
          });
        }
      }
    });
    
    return { similarities, differences };
  }, [items, featureLabels]);

  return (
    <div className="container max-w-6xl py-8 px-4 md:px-6">
      {/* Başlıq və geriyə qayıtma */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/products')}
            className="mr-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Geri qayıt"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Məhsul Müqayisəsi</h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={16} className="mr-2" />
            Analiz {showAnalysis ? 'Gizlət' : 'Göstər'}
          </button>
          
          <button 
            onClick={() => setShowDifferencesOnly(!showDifferencesOnly)}
            className="flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowUpDown size={16} className="mr-2" />
            {showDifferencesOnly ? 'Hamısını göstər' : 'Ancaq fərqləri göstər'}
          </button>
        </div>
      </div>
      
      {/* Boş vəziyyət */}
      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <h2 className="text-xl font-medium mb-4">Müqayisə siyahınız boşdur</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">Məhsulları müqayisə etmək üçün əvvəlcə onları müqayisə siyahınıza əlavə edin.</p>
          <button 
            onClick={() => navigate('/products')}
            className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
          >
            Məhsullara baxın
          </button>
        </div>
      ) : items.length === 1 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <h2 className="text-xl font-medium mb-4">Müqayisə üçün ən azı iki məhsul lazımdır</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">Zəhmət olmasa, müqayisə etmək üçün daha bir məhsul əlavə edin.</p>
          <button 
            onClick={() => navigate('/products')}
            className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
          >
            Daha çox məhsula baxın
          </button>
        </div>
      ) : (
        <>
          {/* Analiz paneli */}
          {showAnalysis && analysis && (
            <div className="mb-8 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer border-b" 
                onClick={() => setAnalysisOpen(!analysisOpen)}
              >
                <h3 className="text-lg font-medium">Məhsul Analizi</h3>
                <button className="p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                  {analysisOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              
              {analysisOpen && (
                <div className="p-5">
                  {/* Oxşarlıqlar */}
                  {analysis.similarities.length > 0 && (
                    <div className="mb-5 p-4 bg-green-50 rounded-lg border border-green-100">
                      <h4 className="font-medium text-green-800 flex items-center mb-3">
                        <CheckCircle2 size={18} className="mr-2 text-green-600" />
                        Oxşarlıqlar
                      </h4>
                      <ul className="space-y-2">
                        {analysis.similarities.map((item, index) => (
                          <li key={index} className="text-sm text-green-800">
                            <span className="font-medium">{item.feature}:</span> {item.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Fərqlər */}
                  {analysis.differences.length > 0 && (
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                      <h4 className="font-medium text-red-800 flex items-center mb-3">
                        <XCircle size={18} className="mr-2 text-red-600" />
                        Fərqlər
                      </h4>
                      <ul className="space-y-4">
                        {analysis.differences.map((item, index) => (
                          <li key={index} className="text-sm">
                            <div className="font-medium text-red-800 mb-2">{item.feature}:</div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {Object.entries(item.values).map(([product, value]) => (
                                <li key={product} className="flex items-start p-2 bg-white rounded border border-red-100">
                                  <span className="font-medium mr-1">{product}:</span> {value}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Xüsusiyyət seçimləri */}
          <div className="mb-8 p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h3 className="font-medium mb-4">Müqayisə xüsusiyyətləri</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(featureLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => toggleFeature(key as CompareFeatureType)}
                  className={`px-4 py-2 text-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    selectedFeatures.includes(key as CompareFeatureType) 
                      ? 'bg-black text-white focus:ring-gray-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Xüsusiyyətlər cədvəli */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 text-left font-medium text-gray-700 w-48">Xüsusiyyət</th>
                  {items.map(item => (
                    <th key={item.id} className="p-6 text-center">
                      <div className="flex flex-col items-center relative">
                        <div 
                          className="w-44 h-48 mx-auto p-2 border border-gray-100 rounded-lg bg-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group relative parfumbar-card"
                          style={{
                            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            transition: 'all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.03)';
                            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px rgba(0, 0, 0, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110"
                            style={{
                              filter: 'brightness(1)',
                            }}
                          />
                          
                          {/* Quick action overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex gap-3 -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <button 
                                onClick={() => addToCart(item)}
                                className="bg-white rounded-full p-2.5 hover:bg-black hover:text-white transition-colors shadow-md hover:scale-110 active:scale-95"
                              >
                                <ShoppingBag size={18} />
                              </button>
                              <button 
                                onClick={() => removeFromCompare(item.id)}
                                className="bg-white rounded-full p-2.5 hover:bg-red-500 hover:text-white transition-colors shadow-md hover:scale-110 active:scale-95"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 text-center w-full">
                          <h4 className="uppercase tracking-wider font-medium text-sm text-gray-600 group-hover:text-primary transition-colors">
                            {item.brand}
                          </h4>
                          <h3 className="font-medium text-base mt-1 hover:text-primary transition-colors">
                            <Link to={`/products/${item.id}`}>{item.name}</Link>
                          </h3>
                          <p className="font-bold mt-2 text-base group-hover:scale-105 transition-transform">
                            {item.price} ₼
                          </p>
                          <div className="flex gap-2 mt-3 justify-center">
                            <button
                              onClick={() => addToCart(item)}
                              className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm"
                            >
                              <ShoppingBag size={12} className="mr-1.5 transition-transform group-hover:scale-110" />
                              Səbətə əlavə et
                            </button>
                            <Link
                              to={`/products/${item.id}`}
                              className="px-3 py-1.5 border border-gray-300 bg-white text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm"
                            >
                              <Eye size={12} className="mr-1.5 transition-transform group-hover:scale-110" />
                              Ətraflı bax
                            </Link>
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedFeatures.includes('gender') && shouldShowRow('gender') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => i > 0 && item.gender !== arr[0].gender) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Cins</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {item.gender || '-'}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('brand') && shouldShowRow('brand') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => i > 0 && item.brand !== arr[0].brand) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Brend</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {item.brand || '-'}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('price') && shouldShowRow('price') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => i > 0 && item.price !== arr[0].price) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Qiymət</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center font-medium">
                        {item.price} ₼
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <button 
                            onClick={() => addToCart(item)}
                            className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm"
                          >
                            <ShoppingBag size={12} className="mr-1.5 transition-transform group-hover:scale-110" />
                            Səbətə əlavə et
                          </button>
                          <Link 
                            to={`/products/${item.id}`}
                            className="px-3 py-1.5 border border-gray-300 bg-white text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm"
                          >
                            <Eye size={12} className="mr-1.5 transition-transform group-hover:scale-110" />
                            Ətraflı bax
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('concentration') && shouldShowRow('concentration') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => i > 0 && item.concentration !== arr[0].concentration) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Konsentrasiya</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {item.concentration || '-'}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('size') && shouldShowRow('size') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => i > 0 && item.size !== arr[0].size) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Həcm</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {item.size || '-'}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('ageGroup') && shouldShowRow('ageGroup') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => i > 0 && item.ageGroup !== arr[0].ageGroup) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Yaş qrupu</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {item.ageGroup || '-'}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('timeOfUse') && shouldShowRow('timeOfUse') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => 
                    i > 0 && item.timeOfUse && arr[0].timeOfUse && 
                    JSON.stringify([...(item.timeOfUse || [])].sort()) !== JSON.stringify([...(arr[0].timeOfUse || [])].sort())
                  ) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">İstifadə vaxtı</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {item.timeOfUse?.join(', ') || '-'}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('season') && shouldShowRow('season') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => 
                    i > 0 && item.season && arr[0].season && 
                    JSON.stringify([...(item.season || [])].sort()) !== JSON.stringify([...(arr[0].season || [])].sort())
                  ) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Fəsil</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {item.season?.join(', ') || '-'}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('style') && shouldShowRow('style') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => 
                    i > 0 && item.style && arr[0].style && 
                    JSON.stringify([...(item.style || [])].sort()) !== JSON.stringify([...(arr[0].style || [])].sort())
                  ) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Üslub</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {item.style?.join(', ') || '-'}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('longevity') && shouldShowRow('longevity') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => i > 0 && item.longevity !== arr[0].longevity) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Qalıcılıq</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {item.longevity || '-'}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('sillage') && shouldShowRow('sillage') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => i > 0 && item.sillage !== arr[0].sillage) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Yayılma</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {item.sillage || '-'}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('topNotes') && shouldShowRow('topNotes') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => 
                    i > 0 && item.notes?.top && arr[0].notes?.top && 
                    JSON.stringify([...(item.notes.top || [])].sort()) !== JSON.stringify([...(arr[0].notes.top || [])].sort())
                  ) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Yuxarı notlar</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {formatNotesArray(item.notes?.top)}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('middleNotes') && shouldShowRow('middleNotes') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => 
                    i > 0 && item.notes?.middle && arr[0].notes?.middle && 
                    JSON.stringify([...(item.notes.middle || [])].sort()) !== JSON.stringify([...(arr[0].notes.middle || [])].sort())
                  ) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Orta notlar</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {formatNotesArray(item.notes?.middle)}
                      </td>
                    ))}
                  </tr>
                )}
                
                {selectedFeatures.includes('baseNotes') && shouldShowRow('baseNotes') && (
                  <tr className={`border-b hover:bg-gray-50 ${items.some((item, i, arr) => 
                    i > 0 && item.notes?.base && arr[0].notes?.base && 
                    JSON.stringify([...(item.notes.base || [])].sort()) !== JSON.stringify([...(arr[0].notes.base || [])].sort())
                  ) ? 'bg-yellow-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-700">Baza notlar</td>
                    {items.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        {formatNotesArray(item.notes?.base)}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}