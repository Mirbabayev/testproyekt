import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Upload, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products as allProducts, Product } from '../../data/products';
import { useCatalogData } from '../../lib/catalog-service';

// Not tipləri
type NoteType = 'top' | 'middle' | 'base';

// Məhsul interfeysi
interface ProductFormData {
  name: string;
  brand: string;
  price: string;
  description: string;
  category: string;
  gender: 'kişi' | 'qadın' | 'uniseks';
  size: string;
  concentration: string;
  inStock: boolean;
  featured: boolean;
  fragranceGroup: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  image: string; // Hələlik URL kimi
}

// Props interfeysi
interface AddProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  isSubmitting?: boolean;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit, isSubmitting = false }) => {
  // Kataloq məlumatlarını əldə etmək üçün hook-u istifadə edirik
  const { catalogData, isLoading: isCatalogLoading } = useCatalogData();
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    price: "",
    description: "",
    category: "parfum",
    gender: "uniseks",
    size: "",
    concentration: "",
    inStock: true,
    featured: false,
    fragranceGroup: "",
    notes: { top: [], middle: [], base: [] },
    image: ""
  });

  // Kataloq məlumatları
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [bottleSizes, setBottleSizes] = useState<string[]>([]);
  const [concentrations, setConcentrations] = useState<string[]>([]);
  const [fragranceGroups, setFragranceGroups] = useState<string[]>([]);
  const [allNotes, setAllNotes] = useState<{top: string[], middle: string[], base: string[]}>({top: [], middle: [], base: []});
  const [brandProducts, setBrandProducts] = useState<Product[]>([]);
  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);
  const [showProductSuggestions, setShowProductSuggestions] = useState(false);
  const [allAvailableProducts, setAllAvailableProducts] = useState<Product[]>(allProducts);
  
  // Kataloq məlumatları yükləndikdə state-ləri güncəlləyirik
  useEffect(() => {
    if (!isCatalogLoading && catalogData) {
      setBrands(["Digər", ...catalogData.brands]);
      setCategories(catalogData.categories);
      setBottleSizes(catalogData.bottleSizes);
      setConcentrations(catalogData.concentrations);
      setFragranceGroups(catalogData.fragranceGroups);
      setAllNotes(catalogData.notes);
    }
  }, [isCatalogLoading, catalogData]);
  
  // Brend və məhsul dropdown-ları üçün state
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [isCustomBrand, setIsCustomBrand] = useState(false);
  const [isCustomProduct, setIsCustomProduct] = useState(false);

  // Notlar üçün state
  const [activeNoteType, setActiveNoteType] = useState<NoteType>('top');
  const [selectedNote, setSelectedNote] = useState("");

  // Autocomplete siyahısını bağlamaq üçün ref-lər
  const brandInputRef = useRef<HTMLInputElement>(null);
  const productNameInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const productDropdownRef = useRef<HTMLDivElement>(null);
  
  // Dropdown-a klik xaricində bağlanma məntiqini əlavə edirik
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        brandDropdownRef.current && 
        !brandDropdownRef.current.contains(event.target as Node)
      ) {
        setShowBrandDropdown(false);
      }
      
      if (
        productDropdownRef.current && 
        !productDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProductDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Input dəyişiklik handleri
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      if (name === 'brand') {
        setProductSuggestions([]);
        setShowProductSuggestions(false);
        setIsCustomBrand(value === "Digər" || !brands.some(b => b.toLowerCase() === value.toLowerCase()));
        
        if (value && value !== "Digər") {
          const exactBrand = brands.find(b => b.toLowerCase() === value.toLowerCase());
          const products = exactBrand 
            ? allProducts.filter(p => p.brand.toLowerCase() === exactBrand.toLowerCase()) 
            : [];
          setBrandProducts(products);
          
          // Avtomatik dropdown açılmasını ləğv edirik
          setShowProductDropdown(false);
        } else {
          setBrandProducts([]);
          setShowProductDropdown(false);
        }
      } 
      else if (name === 'name') {
        const products = formData.brand ? brandProducts : allProducts;
        setIsCustomProduct(!products.some(p => p.name.toLowerCase() === value.toLowerCase()));
        
        if (value) {
          const suggestions = products
            .filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 5);
          setProductSuggestions(suggestions);
          setShowProductSuggestions(suggestions.length > 0);
        } else {
          setProductSuggestions([]);
          setShowProductSuggestions(false);
        }
      }
    }
  };

  // Məhsul təklifinə kliklədikdə
  const handleSuggestionClick = (product: Product) => {
    selectProduct(product);
    setShowProductSuggestions(false);
    setShowProductDropdown(false);
    setIsCustomProduct(false);
  };
  
  // Brend seçimi
  const handleBrandSelect = (brand: string) => {
    if (brand === "Digər") {
      setFormData(prev => ({ ...prev, brand: "" }));
      setIsCustomBrand(true);
      setBrandProducts([]);
    } else {
      setFormData(prev => ({ ...prev, brand, name: "" }));
      setIsCustomBrand(false);
      
      // Brend məhsullarını yüklə
      const products = allProducts.filter(p => 
        p.brand.toLowerCase() === brand.toLowerCase()
      );
      setBrandProducts(products);
      
      // Məhsul dropdown-unu avtomarik açmırıq
      setShowProductDropdown(false);
    }
    setShowBrandDropdown(false);
  };

  // Məhsul seçimi
  const selectProduct = (product: Product) => {
    setFormData(prev => ({
      ...prev,
      name: product.name,
      brand: product.brand,
      price: product.price ? String(product.price) : '',
      description: product.description,
      category: product.category,
      gender: product.gender,
      size: product.size || '',
      concentration: product.concentration || '',
      inStock: product.inStock ?? true,
      notes: {
        top: product.notes?.top || [],
        middle: product.notes?.middle || [],
        base: product.notes?.base || []
      },
      image: product.image || ""
    }));
  };

  // Not əlavə etmək
  const addNote = (note: string) => {
    if (!note || formData.notes[activeNoteType].includes(note)) return;
    setFormData(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [activeNoteType]: [...prev.notes[activeNoteType], note]
      }
    }));
    setSelectedNote(""); 
  };
  
  // Not silmək
  const removeNote = (noteType: NoteType, note: string) => {
    setFormData(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [noteType]: prev.notes[noteType].filter(n => n !== note)
      }
    }));
  };

  // Şəkil yükləmə simulyasiyası
  const handleImageUpload = () => {
    setFormData(prev => ({
      ...prev,
      image: "https://via.placeholder.com/500x500?text=Product+Image"
    }));
  };

  // Form göndərmə
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Form sahəsi komponenti - təkrarlanma azaltmaq üçün
  const FormField = ({ label, children, required = false }: { label: string, children: React.ReactNode, required?: boolean }) => (
    <div className="mb-4">
      <label className="block text-base font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sol tərəf - Əsas Məlumatlar */}
          <div className="space-y-6">
            {/* Əsas məlumatlar */}
            <div className="border rounded-lg p-4 space-y-4 bg-gray-50 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Əsas Məlumatlar</h2>
              
              {/* Brend (Dropdown) */}
              <FormField label="Brend" required>
                <div className="relative" ref={brandDropdownRef}>
                  <div 
                    className="flex cursor-pointer border border-gray-300 rounded-md"
                    onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                  >
                    <input 
                      ref={brandInputRef}
                      type="text" 
                      id="brandInput"
                      name="brand" 
                      value={formData.brand} 
                      onChange={handleInputChange}
                      placeholder="Brend seçin"
                      className="border-0 rounded-l-md w-full shadow-sm focus:ring-1 focus:ring-primary"
                      required
                      autoComplete="off"
                      readOnly={!isCustomBrand}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isCustomBrand) {
                          setShowBrandDropdown(true);
                        }
                      }}
                    />
                    <button 
                      type="button"
                      className="px-3 bg-gray-100 border-l border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-200"
                      onClick={(e) => { 
                        e.preventDefault();
                        e.stopPropagation();
                        setShowBrandDropdown(!showBrandDropdown); 
                      }}
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>
                  
                  {/* Brendlər dropdown-u */}
                  {showBrandDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto py-1">
                      <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 flex justify-between items-center">
                        <span>Brend seçin</span>
                        <button 
                          onClick={() => setShowBrandDropdown(false)}
                          className="text-gray-400 hover:text-gray-600"
                          type="button"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      {brands.map(brand => (
                        <div 
                          key={brand} 
                          className={`px-4 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm transition duration-150 ${brand === "Digər" ? "border-t border-gray-200 mt-1" : ""}`}
                          onClick={() => handleBrandSelect(brand)}
                        >
                          {brand}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormField>

              {/* Məhsul Adı (Dropdown ilə) */}
              <FormField label="Məhsul adı" required>
                <div className="relative" ref={productDropdownRef}>
                  <div 
                    className="flex cursor-pointer border border-gray-300 rounded-md"
                    onClick={() => {
                      setShowProductDropdown(!showProductDropdown);
                    }}
                  >
                    <input 
                      ref={productNameInputRef}
                      type="text" 
                      id="productNameInput" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className="border-0 rounded-l-md w-full shadow-sm focus:ring-1 focus:ring-primary"
                      required
                      autoComplete="off"
                      placeholder="Məhsul seçin"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowProductDropdown(true);
                      }}
                    />
                    <button 
                      type="button"
                      className="px-3 bg-gray-100 border-l border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-200"
                      onClick={(e) => { 
                        e.preventDefault();
                        e.stopPropagation();
                        setShowProductDropdown(!showProductDropdown);
                      }}
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>
                  
                  {/* Məhsullar dropdown-u */}
                  {showProductDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto py-1">
                      <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 flex justify-between items-center">
                        <span>
                          {formData.brand 
                            ? `Seçilmiş brend: ${formData.brand} (${brandProducts.length} məhsul)` 
                            : `Bütün məhsullar (${allProducts.length})`}
                        </span>
                        <button 
                          onClick={() => setShowProductDropdown(false)}
                          className="text-gray-400 hover:text-gray-600"
                          type="button"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      
                      {/* Digər (öz məhsulunu əlavə et) seçimi */}
                      <div 
                        className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm transition duration-150 border-b border-gray-200 mb-1"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, name: "" }));
                          setIsCustomProduct(true);
                          setShowProductDropdown(false);
                        }}
                      >
                        Digər (öz məhsulunu əlavə et)
                      </div>
                      
                      {/* Məhsullar siyahısı */}
                      {(formData.brand ? brandProducts : allProducts).map(product => (
                        <div 
                          key={product.id} 
                          className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm transition duration-150"
                          onClick={() => handleSuggestionClick(product)}
                        >
                          {product.name} 
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.brand})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Custom Product Suggestions List */}
                  {showProductSuggestions && (
                    <div 
                      ref={suggestionsRef}
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto py-1"
                    >
                      <div 
                        className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm transition duration-150 border-b border-gray-200 mb-1"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, name: "" }));
                          setIsCustomProduct(true);
                          setShowProductSuggestions(false);
                        }}
                      >
                        Digər (öz məhsulunu əlavə et)
                      </div>
                    
                      {productSuggestions.map(product => (
                        <div 
                          key={product.id} 
                          className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer text-sm transition duration-150"
                          onClick={() => handleSuggestionClick(product)}
                        >
                          {product.name}
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.brand})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.brand 
                      ? `${formData.brand} brendinə aid məhsullar var. Kliklə siyahıdan seçin və ya öz məhsulunuzu yazın.` 
                      : "Bütün məhsullar arasından seçim edin və ya brend seçərək filtrlənmiş siyahıya baxın."}
                  </p>
                </div>
              </FormField>
              
              {/* Qiymət */}
              <FormField label="Qiymət (₼)" required>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                  min="0" 
                  step="0.01" 
                  className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md w-full shadow-sm" 
                  required 
                />
              </FormField>
              
              {/* Kateqoriya */}
              <FormField label="Kateqoriya" required>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange} 
                  className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md w-full shadow-sm" 
                  required
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </FormField>
              
              {/* Məhsul təsviri */}
              <FormField label="Məhsul təsviri">
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows={4} 
                  className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md w-full shadow-sm"
                ></textarea>
              </FormField>
            </div>
            
            {/* Əlavə məlumatlar */}
            <div className="border rounded-lg p-4 space-y-4 bg-gray-50 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Əlavə Məlumatlar</h2>
              
              {/* Cins */}
              <FormField label="Cins" required>
                <div className="flex flex-wrap space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="kişi"
                      checked={formData.gender === "kişi"}
                      onChange={handleInputChange}
                      className="text-primary"
                    />
                    <span className="ml-2 text-base">Kişi</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="qadın"
                      checked={formData.gender === "qadın"}
                      onChange={handleInputChange}
                      className="text-primary"
                    />
                    <span className="ml-2 text-base">Qadın</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="uniseks"
                      checked={formData.gender === "uniseks"}
                      onChange={handleInputChange}
                      className="text-primary"
                    />
                    <span className="ml-2 text-base">Uniseks</span>
                  </label>
                </div>
              </FormField>
              
              {/* Həcm */}
              <FormField label="Həcm">
                <select 
                  name="size" 
                  value={formData.size} 
                  onChange={handleInputChange} 
                  className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md w-full shadow-sm"
                >
                  <option value="">Seçin</option>
                  {bottleSizes.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
              </FormField>
              
              {/* Konsentrasiya */}
              <FormField label="Konsentrasiya">
                <select 
                  name="concentration" 
                  value={formData.concentration} 
                  onChange={handleInputChange} 
                  className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md w-full shadow-sm"
                >
                  <option value="">Seçin</option>
                  {concentrations.map(conc => <option key={conc} value={conc}>{conc}</option>)}
                </select>
              </FormField>
              
              {/* Stok və Seçilmiş */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {/* Stok vəziyyəti */}
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="inStock" 
                      checked={formData.inStock} 
                      onChange={handleInputChange}
                      className="text-primary rounded focus:ring-primary"
                    />
                    <span className="ml-2 text-base font-medium text-gray-700">Stokda var</span>
                  </label>
                </div>
                
                {/* Seçilmiş məhsul */}
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="featured" 
                      checked={formData.featured} 
                      onChange={handleInputChange}
                      className="text-primary rounded focus:ring-primary"
                    />
                    <span className="ml-2 text-base font-medium text-gray-700">Seçilmiş məhsul</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sağ tərəf */}
          <div className="space-y-6">
            {/* Şəkil yükləmə */}
            <div className="border rounded-lg p-4 space-y-4 bg-gray-50 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Məhsul Şəkli</h2>
              <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-white">
                {formData.image ? (
                  <div className="relative w-full">
                    <img src={formData.image} alt="Product preview" className="w-full h-48 object-contain mx-auto" />
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                      aria-label="Şəkli sil"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleImageUpload}
                    className="flex flex-col items-center p-8 text-gray-500 hover:text-primary transition"
                  >
                    <Upload size={32} className="mb-2" />
                    <span className="text-base font-medium">Şəkil yükləyin</span>
                    <span className="text-sm text-gray-400 mt-1">(Maksimum 2MB, JPG və ya PNG)</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Notlar */}
            <div className="border rounded-lg p-4 space-y-4 bg-gray-50 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">Notlar</h2>
              
              {/* Ətir qrupu */}
              <FormField label="Ətir qrupu">
                <select 
                  name="fragranceGroup" 
                  value={formData.fragranceGroup} 
                  onChange={handleInputChange} 
                  className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md w-full shadow-sm"
                >
                  <option value="">Seçin</option>
                  {fragranceGroups.map(group => <option key={group} value={group}>{group}</option>)}
                </select>
              </FormField>
              
              {/* Not tipi seçimi */}
              <div className="flex border-b mb-4">
                <button
                  type="button"
                  onClick={() => setActiveNoteType('top')}
                  className={`px-4 py-2 text-base font-medium transition ${activeNoteType === 'top' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Yuxarı notlar
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNoteType('middle')}
                  className={`px-4 py-2 text-base font-medium transition ${activeNoteType === 'middle' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Orta notlar
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNoteType('base')}
                  className={`px-4 py-2 text-base font-medium transition ${activeNoteType === 'base' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Baza notlar
                </button>
              </div>
              
              {/* Not əlavə etmə formu */}
              <div className="flex space-x-2 mb-4">
                <select
                  value={selectedNote}
                  onChange={(e) => setSelectedNote(e.target.value)}
                  className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md w-full shadow-sm"
                >
                  <option value="">Not seçin</option>
                  {allNotes[activeNoteType].map(note => (
                    <option key={note} value={note}>{note}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => addNote(selectedNote)}
                  className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition flex-shrink-0 flex items-center"
                  disabled={!selectedNote}
                >
                  <Plus size={18} />
                </button>
              </div>
              
              {/* Seçilmiş notların göstərilməsi */}
              <div className="space-y-4 bg-white p-3 rounded-md border border-gray-100">
                {['top', 'middle', 'base'].map((noteType) => (
                  <div key={noteType} className="space-y-2">
                    <h3 className="text-base font-medium text-gray-700 capitalize">
                      {noteType === 'top' ? 'Yuxarı' : noteType === 'middle' ? 'Orta' : 'Baza'} notlar
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.notes[noteType as NoteType].length > 0 ? (
                        formData.notes[noteType as NoteType].map((note) => (
                          <span
                            key={note}
                            className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                          >
                            {note}
                            <button
                              type="button"
                              onClick={() => removeNote(noteType as NoteType, note)}
                              className="ml-1.5 text-gray-500 hover:text-red-500 transition"
                              aria-label="Notu sil"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500 italic">Not əlavə edilməyib</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Əməliyyat düymələri */}
        <div className="flex justify-end space-x-3 pt-4 mt-4 border-t">
          <Link 
            to="/admin/products" 
            className="px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition shadow-sm font-medium text-base"
          >
            Ləğv et
          </Link>
          <button 
            type="submit" 
            className="px-5 py-2.5 bg-primary text-white rounded-md hover:bg-primary/90 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Əlavə edilir...' : 'Məhsulu əlavə et'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm; 