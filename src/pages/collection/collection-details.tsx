import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Heart, Share2, Edit, Copy, Eye, Trash2, ExternalLink } from 'lucide-react';
import { products } from '../../data/products';

interface Product {
  id: string;
  name: string;
  image: string;
  brand: string;
  description?: string;
  price?: number;
  rating?: number;
  category?: string;
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

export default function CollectionDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<(Product & { note?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  
  // Kolleksiyanı yüklə
  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Demo məqsədləri üçün localStorage-dən yükləyirik
        // Real tətbiqdə bu API çağırışı olacaq
        const storedCollections = localStorage.getItem('collections');
        
        if (storedCollections) {
          const parsedCollections = JSON.parse(storedCollections) as Collection[];
          const foundCollection = parsedCollections.find(c => c.id === id);
          
          if (foundCollection) {
            setCollection(foundCollection);
            setIsOwner(foundCollection.createdBy === 'current_user');
            
            // Kolleksiyada olan məhsulları yüklə
            fetchProductsForCollection(foundCollection);
          } else {
            setError(t('Kolleksiya tapılmadı'));
          }
        } else {
          setError(t('Kolleksiya tapılmadı'));
        }
      } catch (err) {
        console.error('Kolleksiya yüklənərkən xəta baş verdi:', err);
        setError(t('Kolleksiya yüklənərkən xəta baş verdi'));
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchCollection();
    }
  }, [id, t]);
  
  // Kolleksiyadakı məhsulları yüklə
  const fetchProductsForCollection = async (collection: Collection) => {
    // Demo məqsədləri üçün məhsulları götürürük
    // Real tətbiqdə bu API çağırışı olacaq
    const demoProducts: Product[] = [
      {
        id: 'product-1',
        name: 'Aventus',
        brand: 'Creed',
        image: 'https://i.ibb.co/PMCnnKg/creed-aventus.jpg',
        description: 'Kruazyer fasiləsiz hərəkət edən yeni baxış bucaqları ilə yolda olmağın həyəcanını əks etdirir.',
        price: 435,
        rating: 4.8,
        category: 'Niche'
      },
      {
        id: 'product-2',
        name: 'Sauvage',
        brand: 'Dior',
        image: 'https://i.ibb.co/MnS5k5p/dior-sauvage.jpg',
        description: 'Dior Sauvage sərin gecə havası kimi parlaq və təzədir.',
        price: 160,
        rating: 4.7,
        category: 'Designer'
      },
      {
        id: 'product-3',
        name: 'Bleu de Chanel',
        brand: 'Chanel',
        image: 'https://i.ibb.co/m5b1Rtf/chanel-bleu.jpg',
        description: 'Qeyri-adi bir ədviyyat və odun notalarının ahəngi.',
        price: 175,
        rating: 4.6,
        category: 'Designer'
      },
      {
        id: 'product-4',
        name: 'Tobacco Vanille',
        brand: 'Tom Ford',
        image: 'https://i.ibb.co/FKcgHZM/tom-ford-tobacco-vanille.jpg',
        description: 'İsti və lüks, tütün yarpağı və baharatlı oduncaq notaları.',
        price: 340,
        rating: 4.9,
        category: 'Niche'
      },
      {
        id: 'product-5',
        name: 'Black Orchid',
        brand: 'Tom Ford',
        image: 'https://i.ibb.co/zZKqXvj/tom-ford-black-orchid.jpg',
        description: 'Lüks qara qarışqalı, zərif çiçəklər və ədviyyatlı meyvə notaları.',
        price: 280,
        rating: 4.5,
        category: 'Niche'
      },
      {
        id: 'product-6',
        name: 'Santal 33',
        brand: 'Le Labo',
        image: 'https://i.ibb.co/7CW3MX8/le-labo-santal-33.jpg',
        description: 'Oduncaq və ədviyyat notalarının qeyri-adi birləşməsi.',
        price: 310,
        rating: 4.8,
        category: 'Niche'
      },
      {
        id: 'product-7',
        name: 'Y Eau de Parfum',
        brand: 'Yves Saint Laurent',
        image: 'https://i.ibb.co/3F9qzyC/ysl-y.jpg',
        description: 'Alma və zəncəfil notaları ilə zəngin mürəkkəb bir kompozisiya.',
        price: 130,
        rating: 4.4,
        category: 'Designer'
      }
    ];
    
    const collectionProducts = collection.items.map(item => {
      const product = demoProducts.find(p => p.id === item.productId);
      return product ? { ...product, note: item.note } : null;
    }).filter(Boolean) as (Product & { note?: string })[];
    
    setProducts(collectionProducts);
  };
  
  // Kolleksiyanı bəyən
  const likeCollection = () => {
    if (!collection) return;
    
    const newLikes = (collection.likes || 0) + 1;
    
    // Kolleksiyanı yenilə
    setCollection(prev => prev ? { ...prev, likes: newLikes } : null);
    
    // LocalStorage-də də yenilə
    const storedCollections = localStorage.getItem('collections');
    if (storedCollections) {
      const parsedCollections = JSON.parse(storedCollections) as Collection[];
      const updatedCollections = parsedCollections.map(c => 
        c.id === collection.id ? { ...c, likes: newLikes } : c
      );
      
      localStorage.setItem('collections', JSON.stringify(updatedCollections));
    }
  };
  
  // Kolleksiya paylaş
  const shareCollection = () => {
    // Demo məqsədləri üçün mesajı alert kimi göstəririk
    // Real tətbiqdə bu sosial media paylaşma və ya link yaratma funksiyası olacaq
    alert(t('Paylaşmaq funksiyası hazırlanır'));
  };
  
  // Notu formatla - yəni əgər not boşdursa, standart mesaj göstər
  const formatNote = (note?: string) => {
    return note ? note : t('Bu ətir haqqında qeyd əlavə edilməyib');
  };
  
  // Kolleksiyanı sil
  const deleteCollection = async () => {
    if (!collection) return;
    
    if (!window.confirm(t('Bu kolleksiyanı silmək istədiyinizə əminsiniz?'))) {
      return;
    }
    
    try {
      // LocalStorage-dən kolleksiyaları əldə et
      const storedCollections = localStorage.getItem('collections');
      if (storedCollections) {
        const parsedCollections = JSON.parse(storedCollections) as Collection[];
        
        // Kolleksiyanı sil
        const updatedCollections = parsedCollections.filter(c => c.id !== collection.id);
        
        // Yeniləmələri yadda saxla
        localStorage.setItem('collections', JSON.stringify(updatedCollections));
        
        // Ana səhifəyə qayıt
        navigate('/collections');
      }
    } catch (err) {
      console.error('Kolleksiya silinərkən xəta baş verdi:', err);
      setError(t('Kolleksiya silinərkən xəta baş verdi'));
    }
  };
  
  // Tarixi formatla
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (error || !collection) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/collections')}
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t('Kolleksiyalara qayıt')}
          </button>
        </div>
        
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || t('Kolleksiya tapılmadı')}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Yuxarı panel */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/collections')}
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t('Kolleksiyalara qayıt')}
        </button>
        
        <div className="flex space-x-3">
          {isOwner && (
            <>
              <button
                onClick={() => navigate(`/collections/edit/${collection.id}`)}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <Edit className="h-4 w-4 mr-1" />
                {t('Düzəliş et')}
              </button>
              
              <button
                onClick={deleteCollection}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                {t('Sil')}
              </button>
            </>
          )}
          
          <button
            onClick={likeCollection}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-pink-700 bg-pink-100 rounded-md hover:bg-pink-200"
          >
            <Heart className="h-4 w-4 mr-1" />
            <span>{collection.likes || 0}</span>
          </button>
          
          <button
            onClick={shareCollection}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
          >
            <Share2 className="h-4 w-4 mr-1" />
            {t('Paylaş')}
          </button>
        </div>
      </div>
      
      {/* Kolleksiya başlığı bölməsi */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-col lg:flex-row">
          {/* Kolleksiya şəkli */}
          <div className="lg:w-1/3 mb-6 lg:mb-0 lg:pr-6">
            {collection.image ? (
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-gray-500 text-center p-4">
                  <span className="block mb-2 text-lg">{t('Şəkil mövcud deyil')}</span>
                  <span className="text-sm">{t('Bu kolleksiya üçün şəkil təyin edilməyib')}</span>
                </div>
              </div>
            )}
            
            <div className="mt-4">
              <span 
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  collection.isPublic 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {collection.isPublic ? t('İctimai kolleksiya') : t('Şəxsi kolleksiya')}
              </span>
              
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ml-2">
                {t('Yaradılıb')}: {formatDate(collection.createdAt)}
              </span>
            </div>
          </div>
          
          {/* Kolleksiya məlumatları */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{collection.name}</h1>
            
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {collection.description || t('Bu kolleksiya üçün təsvir mövcud deyil')}
            </p>
            
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">{t('Kolleksiya məlumatları')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('Cəmi {{count}} ətir', { count: products.length })}
                  </p>
                </div>
                
                {isOwner && (
                  <button
                    onClick={() => navigate(`/collections/edit/${collection.id}`)}
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    {t('Ətirlər əlavə et')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ətirlər siyahısı */}
      <h2 className="text-xl font-semibold mb-4">{t('Kolleksiyadakı ətirlər')}</h2>
      
      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500 mb-4">{t('Bu kolleksiyada hələ ki heç bir ətir yoxdur')}</p>
          
          {isOwner && (
            <button
              onClick={() => navigate(`/collections/edit/${collection.id}`)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none"
            >
              {t('Ətirlər əlavə et')}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="flex">
                {/* Ətir şəkli */}
                <div className="w-1/3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                {/* Ətir məlumatları */}
                <div className="w-2/3 p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.brand}</p>
                  </div>
                  
                  {product.price && (
                    <p className="text-primary font-medium mb-2">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="inline-flex items-center text-xs font-medium text-gray-700 hover:text-primary"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        {t('Bax')}
                      </button>
                      
                      {product.note && (
                        <button
                          onClick={() => {
                            alert(formatNote(product.note));
                          }}
                          className="inline-flex items-center text-xs font-medium text-gray-700 hover:text-primary"
                        >
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          {t('Qeydlər')}
                        </button>
                      )}
                    </div>
                    
                    <a
                      href={`/products/${product.id}`}
                      className="text-gray-500 hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Qeydlər */}
              {product.note && (
                <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-600">
                  <p className="line-clamp-2">{formatNote(product.note)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 