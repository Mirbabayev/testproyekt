import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Save, Plus, Trash2, X, Check, Image as ImageIcon, Search } from 'lucide-react';
import { products } from '../../data/products';

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  category: string;
  notes?: string[];
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
}

export default function CreateCollection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<CollectionItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Mövcud bütün məhsulları göstərmək
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);
  
  // Şəkil yükləmək
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Fayl məhdudiyyətləri
    if (file.size > 5 * 1024 * 1024) { // 5MB
      setError(t('Şəkil 5MB-dan böyük olmamalıdır'));
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Məhsul əlavə etmək
  const addProductToCollection = (productId: string) => {
    if (selectedProducts.some(item => item.productId === productId)) {
      return; // Artıq əlavə edilib
    }
    
    setSelectedProducts([...selectedProducts, { productId, note: '' }]);
  };
  
  // Məhsul qeydini yeniləmək
  const updateProductNote = (productId: string, note: string) => {
    setSelectedProducts(
      selectedProducts.map(item => 
        item.productId === productId ? { ...item, note } : item
      )
    );
  };
  
  // Məhsulu silmək
  const removeProductFromCollection = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(item => item.productId !== productId));
  };
  
  // Kolleksiyanı yadda saxlamaq
  const saveCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasiya
    if (!name.trim()) {
      setError(t('Kolleksiya adı daxil edin'));
      return;
    }
    
    if (selectedProducts.length === 0) {
      setError(t('Ən azı bir məhsul əlavə edin'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Real API çağırışı burada olacaq
      // Nümunə üçün localStorage-də saxlayırıq
      
      const newCollection: Collection = {
        id: `collection-${Date.now()}`,
        name,
        description,
        image: image || undefined,
        isPublic,
        items: selectedProducts,
        createdAt: new Date().toISOString()
      };
      
      // localStorage-dən mövcud kolleksiyaları əldə et
      const existingCollections = JSON.parse(localStorage.getItem('collections') || '[]');
      
      // Yeni kolleksiyanı əlavə et
      const updatedCollections = [...existingCollections, newCollection];
      
      // Yeniləmələri yadda saxla
      localStorage.setItem('collections', JSON.stringify(updatedCollections));
      
      // Uğurlu nəticə
      setSuccess(t('Kolleksiya uğurla yaradıldı'));
      
      // 2 saniyə sonra kolleksiya siyahısına yönləndir
      setTimeout(() => {
        navigate('/collections');
      }, 2000);
      
    } catch (err) {
      console.error('Kolleksiya yaradılarkən xəta baş verdi:', err);
      setError(t('Kolleksiya yaradılarkən xəta baş verdi'));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Seçilmiş məhsul məlumatlarını əldə etmək
  const getProductDetails = (productId: string) => {
    return products.find(product => product.id === productId);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t('Yeni Ətir Kolleksiyası')}</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        
        <form onSubmit={saveCollection} className="space-y-8">
          {/* Əsas məlumatlar */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">{t('Kolleksiya məlumatları')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Kolleksiya adı')} *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder={t('Məsələn: Yay Ətirlər Kolleksiyam')}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Kolleksiya təsviri')}
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder={t('Bu kolleksiya haqqında qısa məlumat...')}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={e => setIsPublic(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                  {t('Kolleksiyanı ictimai et (digər istifadəçilər görə bilərlər)')}
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('Kolleksiya şəkli')}
              </label>
              
              <div className="mt-1 flex items-center">
                {image ? (
                  <div className="relative">
                    <img
                      src={image}
                      alt="Collection"
                      className="h-32 w-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-32 w-32 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                      <p className="mt-1 text-xs text-gray-500">{t('Şəkil yüklə')}</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
          
          {/* Məhsul seçimi */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">{t('Kolleksiyaya məhsul əlavə et')}</h2>
            
            <div className="flex items-center mb-4">
              <div className="relative flex-grow">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder={t('Ətirlər arasında axtar...')}
                />
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden mb-6">
              <div className="max-h-60 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('Məhsul')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('Brend')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('Kateqoriya')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('Əməliyyat')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                          {t('Məhsul tapılmadı')}
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map(product => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 object-cover rounded"
                                  src={product.image}
                                  alt={product.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.brand}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              type="button"
                              onClick={() => addProductToCollection(product.id)}
                              className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded ${
                                selectedProducts.some(item => item.productId === product.id)
                                  ? 'bg-green-100 text-green-700 cursor-default'
                                  : 'bg-primary text-white hover:bg-primary/90'
                              }`}
                              disabled={selectedProducts.some(item => item.productId === product.id)}
                            >
                              {selectedProducts.some(item => item.productId === product.id) ? (
                                <>
                                  <Check className="h-3.5 w-3.5 mr-1" />
                                  {t('Əlavə edilib')}
                                </>
                              ) : (
                                <>
                                  <Plus className="h-3.5 w-3.5 mr-1" />
                                  {t('Əlavə et')}
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Seçilmiş məhsullar */}
            <div>
              <h3 className="text-md font-medium mb-3">{t('Seçilmiş məhsullar')}</h3>
              
              {selectedProducts.length === 0 ? (
                <p className="text-gray-500 text-sm italic">{t('Kolleksiyaya əlavə edilmiş məhsul yoxdur')}</p>
              ) : (
                <div className="space-y-3">
                  {selectedProducts.map(item => {
                    const product = getProductDetails(item.productId);
                    if (!product) return null;
                    
                    return (
                      <div key={item.productId} className="flex items-start border rounded-md p-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded-md"
                        />
                        
                        <div className="ml-3 flex-grow">
                          <h4 className="text-sm font-medium">{product.name}</h4>
                          <p className="text-xs text-gray-500">{product.brand}</p>
                          
                          <div className="mt-2">
                            <label htmlFor={`note-${item.productId}`} className="text-xs text-gray-500 mb-1 block">
                              {t('Şəxsi qeyd (istəyə bağlı)')}
                            </label>
                            <input
                              type="text"
                              id={`note-${item.productId}`}
                              value={item.note || ''}
                              onChange={e => updateProductNote(item.productId, e.target.value)}
                              className="border border-gray-300 rounded-md text-xs px-2 py-1 w-full"
                              placeholder={t('Bu ətir haqqında qeydləriniz...')}
                            />
                          </div>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => removeProductFromCollection(item.productId)}
                          className="ml-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          {/* Təsdiq düymələri */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/collections')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              {t('Ləğv et')}
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('Yaradılır...')}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  {t('Kolleksiyanı Yarat')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 