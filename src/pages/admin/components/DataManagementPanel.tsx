import { useState, useEffect } from 'react';
import { BrandManager } from './BrandManager';
import { ProductManager } from './ProductManager';
import { NotesManager } from './NotesManager';
import { CategoryManager } from './CategoryManager';
import { Settings, Database, Save } from 'lucide-react';

// Import our initial data
import { products } from '../../../data/products';

// Default veri - bu veri məhsul əlavə etmə səhifəsində də istifadə olunur
const defaultData = {
  brands: [
    "Chanel", "Dior", "Tom Ford", "Lancôme", "Guerlain", "Givenchy", 
    "Yves Saint Laurent", "Jo Malone", "Hermès", "Prada", "Armani", 
    "Versace", "Dolce & Gabbana", "Burberry", "Byredo", "Creed", 
    "Marc Jacobs", "Maison Francis Kurkdjian", "Kilian", "Atelier Cologne", 
    "Penhaligon's", "Parfums de Marly", "Jean Paul Gaultier", "Thierry Mugler", 
    "Gucci", "Calvin Klein", "Diptyque", "Escada", "Valentino"
  ],
  productsByBrand: {
    "Chanel": ["Coco Mademoiselle", "Chance", "N°5", "Bleu de Chanel", "Allure", "Gabrielle", "Cristalle", "Antaeus"],
    "Dior": ["Sauvage", "J'adore", "Miss Dior", "Dior Homme", "Fahrenheit", "Poison", "Hypnotic Poison", "Jadore Dior"],
    "Lancôme": ["La Vie Est Belle", "Trésor", "Idôle", "Hypnôse", "Miracle", "Ô de Lancôme", "Magie Noire"],
    "Tom Ford": ["Black Orchid", "Oud Wood", "Tobacco Vanille", "Neroli Portofino", "Tuscan Leather", "Soleil Blanc", "F*cking Fabulous"],
    "Guerlain": ["Shalimar", "Mon Guerlain", "L'Homme Idéal", "La Petite Robe Noire", "Aqua Allegoria", "Habit Rouge", "Vetiver"],
    "Yves Saint Laurent": ["Black Opium", "Libre", "Mon Paris", "Y", "L'Homme", "Kouros", "La Nuit de L'Homme", "Opium"],
    "Jo Malone": ["English Pear & Freesia", "Lime Basil & Mandarin", "Wood Sage & Sea Salt", "Peony & Blush Suede"],
    "Hermès": ["Terre d'Hermès", "Un Jardin sur le Nil", "Twilly d'Hermès", "Eau des Merveilles", "Kelly Calèche"],
    "Prada": ["Luna Rossa", "L'Homme", "La Femme", "Candy", "Infusion d'Iris", "Amber"],
    "Armani": ["Acqua di Giò", "Code", "Sì", "Armani Privé", "My Way", "Stronger With You", "Diamonds"],
    "Givenchy": ["L'Interdit", "Gentleman", "Amarige", "Ange ou Démon", "Pi", "Very Irrésistible"],
    "Creed": ["Aventus", "Green Irish Tweed", "Silver Mountain Water", "Viking", "Original Santal", "Royal Oud"],
    "Byredo": ["Gypsy Water", "Bal d'Afrique", "Mojave Ghost", "Blanche", "Bibliothèque", "Slow Dance"],
    "Maison Francis Kurkdjian": ["Baccarat Rouge 540", "Grand Soir", "Aqua Universalis", "Amyris", "Oud Satin Mood"],
    "Versace": ["Bright Crystal", "Eros", "Dylan Blue", "Crystal Noir", "The Dreamer", "Blue Jeans", "Yellow Diamond", "Versense"],
    "Dolce & Gabbana": ["Light Blue", "The One", "K", "Pour Homme", "Dolce", "The Only One", "Pour Femme"],
    "Burberry": ["Her", "Brit", "Touch", "My Burberry", "London", "Mr. Burberry", "Weekend"],
    "Kilian": ["Good Girl Gone Bad", "Black Phantom", "Straight to Heaven", "Love Don't Be Shy", "Moonlight in Heaven"],
    "Marc Jacobs": ["Daisy", "Decadence", "Perfect", "Dot", "Divine Decadence", "Honey"],
    "Atelier Cologne": ["Orange Sanguine", "Vanille Insensée", "Clémentine California", "Cédrat Enivrant", "Café Tuberosa"],
    "Penhaligon's": ["Halfeti", "Empressa", "Endymion", "Luna", "Portraits Collection", "Quercus"],
    "Parfums de Marly": ["Layton", "Percival", "Delina", "Pegasus", "Herod", "Carlisle"],
    "Jean Paul Gaultier": ["Le Male", "Classique", "Scandal", "Ultra Male", "Le Beau"],
    "Thierry Mugler": ["Angel", "Alien", "Womanity", "A*Men", "Aura", "Angel Muse"],
    "Gucci": ["Bloom", "Guilty", "Flora", "Memoire", "Bamboo", "Made to Measure"],
    "Calvin Klein": ["CK One", "Eternity", "Obsession", "Euphoria", "CK Be", "CK Everyone"],
    "Diptyque": ["Philosykos", "Do Son", "Eau Rose", "L'Ombre dans L'Eau", "Tam Dao", "Eau Duelle"],
    "Escada": ["Cherry in the Air", "Born in Paradise", "Flor del Sol", "Island Kiss", "Moon Sparkle", "Turquoise Summer"],
    "Valentino": ["Valentino Uomo", "Valentina", "Born in Roma", "Donna", "Voce Viva", "Noir Absolu"]
  },
  categories: ["parfum", "skin care", "makeup", "hair care", "body care"],
  notes: {
    top: [
      // Sitrus notları
      "Bergamot", "Limon", "Portağal", "Mandalin", "Qreypfrut", "Laym",
      // Meyvə notları
      "Alma", "Armud", "Ananas", "Şaftalı", "Ərik", "Gilas", 
      "Albalı", "Qara qarağat", "Qırmızı qarağat", "Çiyələk", "Moruq",
      // Yaşıl notlar
      "Yaşıl yarpaqlar", "Nanə", "Rozmarin", "Bənövşə yarpağı", 
      // Ədviyyat notları
      "Zəncəfil", "Qara istiot", "Çili", "Mixək", "Darçın", "Nutmeg",
      // Digər
      "Aldehidlər", "Dəniz notları", "Konyak", "Viski", "Anise"
    ],
    middle: [
      // Çiçək notları
      "Qızılgül", "Jasmin", "Lavanda", "Yasəmən", "Bənövşə", "Süsən", 
      "Zanbaq", "Orkide", "Mimoza", "Süsəngülü (İris)", "Günəbaxan", "Tubereuse",
      "Nərgiz", "Qartopu çiçəyi", "Freziya", "Pion", "Hibiskus", "Magnoliya",
      // Ədviyyat notları
      "Hil", "Zəfəran", "Muskat", "Dəfnə yarpağı", "Keşniş", "Şüyüd",
      // Digər
      "Bal", "Ulduz anisi", "Çay", "Yaşıl çay", "Kakao", "Espresso",
      "Süd", "Badəm", "Qəhvə", "Kakos südü", "İçki notları", "Tütün çiçəyi"
    ],
    base: [
      // Odunlu notlar
      "Vanil", "Müşk", "Paçuli", "Ənbər", "Oud", "Sedir", "Sandal ağacı",
      "Vetiver", "Benzoin", "Labdanum", "Qatran", "Kəhrəba", "Daş kömür",
      // Balzamik notlar
      "Peru balzamı", "Kopaiva balzamı", "Tolu balzamı", "Kopal", "Styrax",
      // Heyvan notları
      "Kastoreum", "Civetta", "Ambergris", "Dəri",
      // Digər
      "Tonka paxlası", "Tütün", "Kakao", "Qəhvə", "Karamel", 
      "Pralini", "Şokolad", "Məxmər", "Mirrha", "Buxur", "Ladanum"
    ]
  },
  fragranceGroups: [
    "Şərq", "Çiçəkli", "Odunlu", "Sitrus", "Fougère", "Aldehydic", 
    "Aromatic", "Chypre", "Dəri", "Gourmand", "Yaşıl", "Su", "Tərəvəz", 
    "Meyvəli", "Spicy", "Ədviyyatlı", "Tütün", "İçki"
  ],
  bottleSizes: ["30ml", "50ml", "75ml", "100ml", "125ml", "150ml", "200ml"],
  perfumers: [
    "Françis Kurkdjian", "Alberto Morillas", "Christine Nagel",
    "Olivier Polge", "Jacques Polge", "Jean-Claude Ellena", 
    "Mathilde Laurent", "Daniela Andrier", "Thierry Wasser",
    "Maurice Roucel", "Jean-Louis Sieuzac", "Sophia Grojsman",
    "Christopher Sheldrake", "Dominique Ropion", "Anne Flipo",
    "Carlos Benaim", "Calice Becker", "Jacques Cavallier",
    "Edouard Fléchier", "Pierre Bourdon", "Michel Almairac",
    "Annick Menardo", "Nathalie Lorson", "Olivier Cresp"
  ],
  countries: [
    "Fransa", "İtaliya", "ABŞ", "Böyük Britaniya", "İspaniya", 
    "Almaniya", "İsveçrə", "Birləşmiş Ərəb Əmirlikləri", "Yaponiya", 
    "Kanada", "Niderland", "İsveç", "Avstraliya", "Hindistan", 
    "Belçika", "Rusiya", "Braziliya", "Portuqaliya", "Türkiyə"
  ]
};

const DataManagementPanel = () => {
  // For storing data
  const [brands, setBrands] = useState<string[]>([]);
  const [productsByBrand, setProductsByBrand] = useState<{ [brand: string]: string[] }>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [notes, setNotes] = useState<{ top: string[]; middle: string[]; base: string[] }>({
    top: [],
    middle: [],
    base: []
  });
  
  // Panel state
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract initial data from products or use defaultData
  useEffect(() => {
    try {
      // Əvvəlcə localStorage-dən yoxla
      const savedData = localStorage.getItem('catalogData');
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // LocalStorage məlumatlarını istifadə et
        setBrands(parsedData.brands || defaultData.brands);
        setProductsByBrand(parsedData.productsByBrand || defaultData.productsByBrand);
        setCategories(parsedData.categories || defaultData.categories);
        
        // Notlar
        if (parsedData.notes && typeof parsedData.notes === 'object' && 
            parsedData.notes.top && parsedData.notes.middle && parsedData.notes.base) {
          setNotes(parsedData.notes);
        } else {
          setNotes(defaultData.notes);
        }
        return;
      }
      
      // LocalStorage-də məlumat yoxdursa, productlardan çıxarılan məlumatları istifadə et
      if (products.length > 0) {
        // Extract unique brands
        const extractedBrands = Array.from(new Set(products.map(product => product.brand)));
        
        // Extract product names by brand
        const extractedProductsByBrand: { [brand: string]: string[] } = {};
        extractedBrands.forEach(brand => {
          extractedProductsByBrand[brand] = products
            .filter(product => product.brand === brand)
            .map(product => product.name);
        });
        
        // Extract unique categories
        const extractedCategories = Array.from(new Set(products.map(product => product.category)));
        
        // Check if products have notes in the new format
        const hasStructuredNotes = products.some(product => 
          product.notes && typeof product.notes === 'object' && 
          product.notes.top && product.notes.middle && product.notes.base
        );
        
        if (hasStructuredNotes) {
          // Extract all unique notes
          const extractedTopNotes = Array.from(
            new Set(products.flatMap(product => 
              product.notes && typeof product.notes === 'object' ? product.notes.top || [] : []
            ))
          );
          const extractedMiddleNotes = Array.from(
            new Set(products.flatMap(product => 
              product.notes && typeof product.notes === 'object' ? product.notes.middle || [] : []
            ))
          );
          const extractedBaseNotes = Array.from(
            new Set(products.flatMap(product => 
              product.notes && typeof product.notes === 'object' ? product.notes.base || [] : []
            ))
          );
          
          // Set the extracted data
          setBrands(extractedBrands);
          setProductsByBrand(extractedProductsByBrand);
          setCategories(extractedCategories);
          setNotes({
            top: extractedTopNotes,
            middle: extractedMiddleNotes,
            base: extractedBaseNotes
          });
        } else {
          // Set default notes but use extracted brands, products, and categories
          setBrands(extractedBrands);
          setProductsByBrand(extractedProductsByBrand);
          setCategories(extractedCategories);
          setNotes(defaultData.notes);
        }
      } else {
        // No products, use default data for everything
        setBrands(defaultData.brands);
        setProductsByBrand(defaultData.productsByBrand);
        setCategories(defaultData.categories);
        setNotes(defaultData.notes);
      }
    } catch (error) {
      console.error("Error loading catalog data:", error);
      // Use default data on error
      setBrands(defaultData.brands);
      setProductsByBrand(defaultData.productsByBrand);
      setCategories(defaultData.categories);
      setNotes(defaultData.notes);
    }
  }, []);

  // Handle saving data to localStorage
  const saveDataToLocalStorage = () => {
    const catalogData = {
      brands,
      productsByBrand,
      categories,
      notes
    };
    
    localStorage.setItem('catalogData', JSON.stringify(catalogData));
    alert('Kataloq məlumatları yadda saxlanıldı!');
  };

  // Handlers for manager components
  const handleSaveBrands = (updatedBrands: string[]) => {
    setBrands(updatedBrands);
  };
  
  const handleSaveProducts = (updatedProducts: { [brand: string]: string[] }) => {
    setProductsByBrand(updatedProducts);
  };
  
  const handleSaveCategories = (updatedCategories: string[]) => {
    setCategories(updatedCategories);
  };
  
  const handleSaveNotes = (updatedNotes: { top: string[]; middle: string[]; base: string[] }) => {
    setNotes(updatedNotes);
  };

  return (
    <div className={`bg-white border rounded-lg shadow-sm transition-all duration-300 ${isExpanded ? 'p-5' : 'p-4'}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium">Məlumatların İdarəsi</h3>
        </div>
        
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-primary transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
      
      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <BrandManager
              existingBrands={brands}
              onSaveBrands={handleSaveBrands}
            />
            
            <ProductManager
              existingProducts={productsByBrand}
              existingBrands={brands}
              onSaveProducts={handleSaveProducts}
            />
            
            <CategoryManager
              existingCategories={categories}
              onSaveCategories={handleSaveCategories}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <NotesManager
              existingNotes={notes}
              onSaveNotes={handleSaveNotes}
            />
            
            <button
              type="button"
              onClick={saveDataToLocalStorage}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} /> Bütün məlumatları yadda saxla
            </button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              <strong>Statistika:</strong>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                <div className="bg-blue-50 rounded-md p-2">
                  <div className="text-blue-700 font-medium">{brands.length}</div>
                  <div className="text-xs">Brend</div>
                </div>
                <div className="bg-purple-50 rounded-md p-2">
                  <div className="text-purple-700 font-medium">
                    {Object.values(productsByBrand).reduce((acc, arr) => acc + arr.length, 0)}
                  </div>
                  <div className="text-xs">Məhsul</div>
                </div>
                <div className="bg-green-50 rounded-md p-2">
                  <div className="text-green-700 font-medium">{categories.length}</div>
                  <div className="text-xs">Kateqoriya</div>
                </div>
                <div className="bg-gold-50 rounded-md p-2">
                  <div className="text-gold-700 font-medium">
                    {notes.top.length + notes.middle.length + notes.base.length}
                  </div>
                  <div className="text-xs">Not</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagementPanel; 