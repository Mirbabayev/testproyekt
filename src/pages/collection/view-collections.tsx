import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Eye, Edit, Trash2, Share2, Heart, UserCircle, Calendar, Search } from 'lucide-react';
import { products } from '../../data/products';

interface Product {
  id: string;
  name: string;
  image: string;
  brand: string;
}

interface CollectionItem {
  productId: string;
  note?: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  image?: string;
  isPublic: boolean;
  items: CollectionItem[];
  createdAt: string;
  createdBy?: string;
  likes?: number;
}

export default function ViewCollections() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [collections, setCollections] = useState<Collection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'all' | 'my' | 'public'>('all');
  
  // Kolleksiyaları əldə et
  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Demo məqsədləri üçün localStorage-dən oxuyuruq
        // Real tətbiqdə bu API çağırışı olacaq
        const storedCollections = localStorage.getItem('collections');
        
        // Əgər saxlanılmış kolleksiyalar varsa
        if (storedCollections) {
          const parsedCollections = JSON.parse(storedCollections) as Collection[];
          
          // Demo məqsədləri üçün bəzi əlavə məlumatlar əlavə edirik
          // Real tətbiqdə bu məlumatlar verilənlər bazasında olacaq
          const enhancedCollections = parsedCollections.map(collection => ({
            ...collection,
            createdBy: collection.createdBy || 'current_user', // Demo məqsədləri üçün
            likes: collection.likes || Math.floor(Math.random() * 50) // Demo məqsədləri üçün
          }));
          
          setCollections(enhancedCollections);
          setFilteredCollections(enhancedCollections);
        } else {
          // Demo kolleksiyalar
          const demoCollections: Collection[] = [
            {
              id: 'demo-1',
              name: 'Yay Ətirlər Kolleksiyası',
              description: 'İsti yay günləri üçün təravətli və yüngül ətirlər',
              image: 'https://via.placeholder.com/300?text=Summer+Collection',
              isPublic: true,
              items: [
                { productId: 'product-1' },
                { productId: 'product-2' },
                { productId: 'product-3' }
              ],
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
              createdBy: 'current_user',
              likes: 27
            },
            {
              id: 'demo-2',
              name: 'Odlu və İsti Ətirlər',
              description: 'Soyuq qış gecələrinə uyğun ədviyyatlı və isti ətirlər',
              image: 'https://via.placeholder.com/300?text=Spicy+Collection',
              isPublic: true,
              items: [
                { productId: 'product-4' },
                { productId: 'product-5' }
              ],
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
              createdBy: 'another_user',
              likes: 12
            },
            {
              id: 'demo-3',
              name: 'Şəxsi Seçimlərim',
              description: 'Ən sevdiyim ətirlər kolleksiyası',
              isPublic: false,
              items: [
                { productId: 'product-1' },
                { productId: 'product-6' },
                { productId: 'product-7' }
              ],
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
              createdBy: 'current_user',
              likes: 0
            }
          ];
          
          setCollections(demoCollections);
          setFilteredCollections(demoCollections);
          
          // Demo kolleksiyaları localStorage-ə yadda saxla
          localStorage.setItem('collections', JSON.stringify(demoCollections));
        }
      } catch (err) {
        console.error('Kolleksiyaları əldə edərkən xəta baş verdi:', err);
        setError(t('Kolleksiyaları əldə edərkən xəta baş verdi'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchCollections();
  }, [t]);
  
  // Axtarış və süzgəc
  useEffect(() => {
    let filtered = [...collections];
    
    // Görünüş rejimini tətbiq et
    if (viewMode === 'my') {
      filtered = filtered.filter(collection => collection.createdBy === 'current_user');
    } else if (viewMode === 'public') {
      filtered = filtered.filter(collection => collection.isPublic);
    }
    
    // Axtarış terminini tətbiq et
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(collection => 
        collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCollections(filtered);
  }, [collections, searchTerm, viewMode]);
  
  // Tarixi formatla
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Kolleksiyanı sil
  const deleteCollection = async (id: string) => {
    if (!window.confirm(t('Bu kolleksiyanı silmək istədiyinizə əminsiniz?'))) {
      return;
    }
    
    try {
      // LocalStorage-dən kolleksiyaları əldə et
      const storedCollections = localStorage.getItem('collections');
      if (storedCollections) {
        const parsedCollections = JSON.parse(storedCollections) as Collection[];
        
        // Kolleksiyanı sil
        const updatedCollections = parsedCollections.filter(c => c.id !== id);
        
        // Yeniləmələri yadda saxla
        localStorage.setItem('collections', JSON.stringify(updatedCollections));
        
        // State-i yenilə
        setCollections(updatedCollections);
      }
    } catch (err) {
      console.error('Kolleksiya silinərkən xəta baş verdi:', err);
      setError(t('Kolleksiya silinərkən xəta baş verdi'));
    }
  };
  
  // Kolleksiyanı bəyən/paylaş
  const likeCollection = (id: string) => {
    setCollections(prevCollections =>
      prevCollections.map(collection =>
        collection.id === id
          ? { ...collection, likes: (collection.likes || 0) + 1 }
          : collection
      )
    );
  };
  
  // Məhsul haqqında məlumat əldə et
  const getProductInfo = (productId: string): Product | undefined => {
    return products.find(p => p.id === productId);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">{t('Ətir Kolleksiyaları')}</h1>
          <p className="text-gray-600">{t('Öz ətirlər kolleksiyalarınızı yaradın və paylaşın')}</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => navigate('/collections/create')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none"
          >
            <Plus className="h-5 w-5 mr-1" />
            {t('Yeni Kolleksiya')}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {/* Filtrlər və axtarış */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 text-sm rounded-full ${
                viewMode === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('Bütün')}
            </button>
            <button
              onClick={() => setViewMode('my')}
              className={`px-3 py-1.5 text-sm rounded-full ${
                viewMode === 'my'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('Mənim')}
            </button>
            <button
              onClick={() => setViewMode('public')}
              className={`px-3 py-1.5 text-sm rounded-full ${
                viewMode === 'public'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('İctimai')}
            </button>
          </div>
          
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary text-sm"
              placeholder={t('Kolleksiyalar arasında axtar...')}
            />
          </div>
        </div>
      </div>
      
      {/* Kolleksiya siyahısı */}
      {loading ? (
        <div className="flex items-center justify-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredCollections.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <div className="text-gray-500 mb-4">
            {viewMode === 'my' ? (
              <p className="text-lg">{t('Hələ ki heç bir kolleksiyanız yoxdur')}</p>
            ) : (
              <p className="text-lg">{t('Heç bir kolleksiya tapılmadı')}</p>
            )}
          </div>
          
          {viewMode === 'my' && (
            <button
              onClick={() => navigate('/collections/create')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none"
            >
              <Plus className="h-4 w-4 mr-1" />
              {t('Yeni Kolleksiya Yarat')}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map(collection => (
            <div key={collection.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Kolleksiya şəkli */}
              <div className="relative h-48 bg-gray-100">
                {collection.image ? (
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-50">
                    <div className="text-gray-400 text-center p-4">
                      <div className="flex justify-center">
                        {collection.items.slice(0, 3).map((item, index) => {
                          const product = getProductInfo(item.productId);
                          return product ? (
                            <div
                              key={item.productId}
                              className="h-16 w-16 border-2 border-white rounded-full overflow-hidden -ml-4 first:ml-0"
                              style={{ zIndex: 3 - index }}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* İctimai/şəxsi badge */}
                <div className="absolute top-2 left-2">
                  <span 
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      collection.isPublic 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {collection.isPublic ? t('İctimai') : t('Şəxsi')}
                  </span>
                </div>
                
                {/* Məhsul sayı */}
                <div className="absolute bottom-2 right-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-gray-800 shadow-sm">
                    {collection.items.length} {t('ətir')}
                  </span>
                </div>
              </div>
              
              {/* Kolleksiya məlumatları */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 truncate">{collection.name}</h3>
                
                {collection.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {collection.description}
                  </p>
                )}
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <UserCircle className="h-4 w-4 mr-1" />
                  <span>{collection.createdBy === 'current_user' ? t('Siz') : t('İstifadəçi')}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(collection.createdAt)}</span>
                </div>
                
                {/* Əməliyyat düymələri */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/collections/${collection.id}`)}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      {t('Bax')}
                    </button>
                    
                    {collection.createdBy === 'current_user' && (
                      <>
                        <button
                          onClick={() => navigate(`/collections/edit/${collection.id}`)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          {t('Düzəliş')}
                        </button>
                        
                        <button
                          onClick={() => deleteCollection(collection.id)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          {t('Sil')}
                        </button>
                      </>
                    )}
                  </div>
                  
                  {collection.isPublic && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => likeCollection(collection.id)}
                        className="inline-flex items-center text-gray-500 hover:text-red-500"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="ml-1 text-xs">{collection.likes}</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          // Paylaş funksiyası - demo üçün alert göstərə bilərik
                          alert(t('Paylaşmaq funksiyası hazırlanır'));
                        }}
                        className="text-gray-500 hover:text-primary"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 