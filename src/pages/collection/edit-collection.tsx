import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, Trash2, X, Save, Image, Eye } from 'lucide-react';
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

export default function EditCollection() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Kolleksiya state-ləri
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [image, setImage] = useState<string | undefined>();
  const [selectedItems, setSelectedItems] = useState<CollectionItem[]>([]);
  
  // UI state-ləri
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Mövcud kolleksiyanı yüklə
  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Demo məqsədləri üçün məhsulları yüklə
        // Real tətbiqdə bu API çağırışı olacaq
        loadDemoProducts();
        
        // Yeni kolleksiya yaradılırsa yüklənmir
        if (!id) {
          setLoading(false);
          return;
        }
        
        // Demo məqsədləri üçün localStorage-dən yükləyirik
        // Real tətbiqdə bu API çağırışı olacaq
        const storedCollections = localStorage.getItem('collections');
        
        if (storedCollections) {
          const parsedCollections = JSON.parse(storedCollections) as Collection[];
          const foundCollection = parsedCollections.find(c => c.id === id);
          
          if (foundCollection) {
            // Kolleksiya məlumatlarını doldur
            setName(foundCollection.name);
            setDescription(foundCollection.description || '');
            setIsPublic(foundCollection.isPublic);
            setImage(foundCollection.image);
            setSelectedItems(foundCollection.items || []);
          } else {
            setError(t('Kolleksiya tapılmadı'));
            setTimeout(() => navigate('/collections'), 2000);
          }
        } else {
          setError(t('Kolleksiya tapılmadı'));
          setTimeout(() => navigate('/collections'), 2000);
        }
      } catch (err) {
        console.error('Kolleksiya yüklənərkən xəta baş verdi:', err);
        setError(t('Kolleksiya yüklənərkən xəta baş verdi'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchCollection();
  }, [id, navigate, t]);
  
  // Demo məhsulları yüklə
  const loadDemoProducts = () => {
    // Demo məhsullar - bu real tətbiqdə API-dən gələcək
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
    
    setAllProducts(demoProducts);
    setFilteredProducts(demoProducts);
  };
  
  // Axtarış süzgəci
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(allProducts);
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filtered = allProducts.filter(
        product => 
          product.name.toLowerCase().includes(lowerSearchTerm) || 
          product.brand.toLowerCase().includes(lowerSearchTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, allProducts]);
  
  // Şəkil yüklə
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Şəkil ölçüsü yoxlanışı
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError(t('Şəkil 5MB-dan kiçik olmalıdır'));
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Məhsulu əlavə et
  const addProduct = (product: Product) => {
    // Əgər məhsul artıq əlavə olunubsa, əlavə etmə
    if (selectedItems.some(item => item.productId === product.id)) {
      return;
    }
    
    setSelectedItems(prev => [...prev, { productId: product.id }]);
  };
  
  // Məhsulu sil
  const removeProduct = (productId: string) => {
    setSelectedItems(prev => prev.filter(item => item.productId !== productId));
  };
  
  // Məhsul notlarını yenilə
  const updateProductNote = (productId: string, note: string) => {
    setSelectedItems(prev => 
      prev.map(item => 
        item.productId === productId 
          ? { ...item, note } 
          : item
      )
    );
  };
  
  // Kolleksiyanı yadda saxla
  const saveCollection = async () => {
    // Validasiya
    if (!name.trim()) {
      setError(t('Kolleksiya adı daxil edin'));
      return;
    }
    
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Geri qayıdış üçün kolleksiya ID-sini saxla
      const collectionId = id || `collection-${Date.now()}`;
      
      // Kolleksiya obyektini yarat
      const updatedCollection: Collection = {
        id: collectionId,
        name,
        description,
        image,
        isPublic,
        items: selectedItems,
        createdAt: id ? 
          // Əgər düzəliş edirsə, orijinal yaradılma tarixini saxla
          (JSON.parse(localStorage.getItem('collections') || '[]') as Collection[])
            .find(c => c.id === id)?.createdAt || new Date().toISOString() :
          // Yeni yaradılırsa, cari tarixi istifadə et
          new Date().toISOString(),
        createdBy: 'current_user', // Demo məqsədləri üçün
        // Likes dəyişə bilməz - sadəcə orijinal dəyəri saxla
        likes: id ?
          (JSON.parse(localStorage.getItem('collections') || '[]') as Collection[])
            .find(c => c.id === id)?.likes || 0 :
          0
      };
      
      // Demo məqsədləri üçün localStorage-də saxla
      // Real tətbiqdə bu API çağırışı olacaq
      const storedCollections = localStorage.getItem('collections');
      let collections: Collection[] = [];
      
      if (storedCollections) {
        collections = JSON.parse(storedCollections) as Collection[];
        
        if (id) {
          // Mövcud kolleksiyanı yenilə
          collections = collections.map(c => 
            c.id === id ? updatedCollection : c
          );
        } else {
          // Yeni kolleksiya əlavə et
          collections.push(updatedCollection);
        }
      } else {
        // İlk kolleksiyanı əlavə et
        collections = [updatedCollection];
      }
      
      // Kolleksiyaları saxla
      localStorage.setItem('collections', JSON.stringify(collections));
      
      // Uğurlu yaddasaxlama mesajı göstər
      setSuccess(t('Kolleksiya uğurla yadda saxlandı'));
      
      // 1.5 saniyədən sonra kolleksiya təfərrüatları səhifəsinə keç
      setTimeout(() => {
        navigate(`/collections/${collectionId}`);
      }, 1500);
    } catch (err) {
      console.error('Kolleksiya yadda saxlanarkən xəta baş verdi:', err);
      setError(t('Kolleksiya yadda saxlanarkən xəta baş verdi'));
    } finally {
      setSaving(false);
    }
  };
  
  // Seçilmiş məhsul haqqında məlumat əldə et
  const getProductInfo = (productId: string): Product | undefined => {
    return allProducts.find(p => p.id === productId);
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
        
        <button
          onClick={saveCollection}
          disabled={saving}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
          } focus:outline-none`}
        >
          {saving ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              {t('Saxlanır...')}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1" />
              {t('Saxla')}
            </>
          )}
        </button>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">
        {id ? t('Kolleksiyanı düzəlt') : t('Yeni kolleksiya yarat')}
      </h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol tərəf - Kolleksiya məlumatları */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">{t('Kolleksiya məlumatları')}</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Kolleksiya adı')} *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('Məsələn: Yay ətirlər kolleksiyası')}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Təsvir')}
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('Kolleksiya haqqında məlumat daxil edin...')}
                  rows={4}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Görünürlük')}
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      checked={!isPublic}
                      onChange={() => setIsPublic(false)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{t('Şəxsi')}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      checked={isPublic}
                      onChange={() => setIsPublic(true)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{t('İctimai')}</span>
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {isPublic
                    ? t('İctimai kolleksiyalar bütün istifadəçilər tərəfindən görünəcək.')
                    : t('Şəxsi kolleksiyalar yalnız sizin tərəfinizdən görünəcək.')}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Şəkil (istəyə bağlı)')}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {image ? (
                    <div className="relative w-full">
                      <img
                        src={image}
                        alt={name}
                        className="max-h-48 mx-auto object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setImage(undefined)}
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80">
                          <Image className="mx-auto h-12 w-12 text-gray-400" />
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            {t('Şəkil yüklə')}
                          </span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        {t('PNG, JPG, GIF, max 5MB')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Seçilmiş məhsullar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{t('Seçilmiş ətirlər')}</h2>
              <span className="text-sm text-gray-500">
                {selectedItems.length} {t('ətir')}
              </span>
            </div>
            
            {selectedItems.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                <p className="text-sm">{t('Kolleksiyaya əlavə etmək üçün ətirlər seçin')}</p>
                <p className="text-xs mt-1">{t('Sağdakı siyahıdan ətirlər əlavə edə bilərsiniz')}</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {selectedItems.map(item => {
                  const product = getProductInfo(item.productId);
                  if (!product) return null;
                  
                  return (
                    <div key={item.productId} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="ml-3 flex-grow">
                          <h3 className="text-sm font-medium">{product.name}</h3>
                          <p className="text-xs text-gray-500">{product.brand}</p>
                        </div>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="flex-shrink-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="mt-2">
                        <textarea
                          placeholder={t('Bu ətir haqqında qeydlər əlavə edin (istəyə bağlı)')}
                          value={item.note || ''}
                          onChange={(e) => updateProductNote(item.productId, e.target.value)}
                          rows={2}
                          className="block w-full text-xs border border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:outline-none focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        {/* Sağ tərəf - Məhsul siyahısı */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="mb-4">
              <label htmlFor="product-search" className="block text-lg font-semibold mb-2">
                {t('Ətirlər axtar və əlavə et')}
              </label>
              <input
                type="text"
                id="product-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('Ətir adı və ya marka ilə axtar...')}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary text-sm"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredProducts.map(product => {
                const isSelected = selectedItems.some(item => item.productId === product.id);
                
                return (
                  <div 
                    key={product.id} 
                    className={`border rounded-lg p-4 transition-colors ${
                      isSelected ? 'border-primary bg-primary/5' : 'hover:border-gray-300'
                    }`}
                  >
                    <div className="flex">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-20 w-16 object-cover rounded-md"
                      />
                      
                      <div className="ml-4 flex-grow">
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                        
                        {product.price && (
                          <p className="text-primary text-sm font-medium">
                            ${product.price.toFixed(2)}
                          </p>
                        )}
                        
                        <div className="mt-2 flex space-x-2">
                          <button
                            onClick={() => isSelected ? removeProduct(product.id) : addProduct(product)}
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                              isSelected
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-primary/10 text-primary hover:bg-primary/20'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <X className="h-3 w-3 mr-1" />
                                {t('Sil')}
                              </>
                            ) : (
                              <>
                                <Plus className="h-3 w-3 mr-1" />
                                {t('Əlavə et')}
                              </>
                            )}
                          </button>
                          
                          <button
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            {t('Bax')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-2 py-8 text-center text-gray-500">
                  <p>{t('Axtarışa uyğun nəticə tapılmadı')}</p>
                  <p className="text-sm mt-1">{t('Fərqli açar sözlər ilə yenidən cəhd edin')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 