import React, { useState } from 'react';
import { useCatalogData } from '../../lib/catalog-service';
import { Plus, X, Save, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

type TabType = 'brands' | 'categories' | 'sizes' | 'concentrations' | 'groups' | 'notes';
type NoteType = 'top' | 'middle' | 'base';

const CatalogManager: React.FC = () => {
  const { 
    catalogData, 
    isLoading, 
    addBrand, 
    addCategory, 
    addBottleSize, 
    addConcentration, 
    addFragranceGroup, 
    addNote,
    resetCatalogData
  } = useCatalogData();

  const [activeTab, setActiveTab] = useState<TabType>('brands');
  const [activeNoteType, setActiveNoteType] = useState<NoteType>('top');
  
  // Yeni elementlər üçün inputlar
  const [newBrand, setNewBrand] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSize, setNewSize] = useState('');
  const [newConcentration, setNewConcentration] = useState('');
  const [newGroup, setNewGroup] = useState('');
  const [newNote, setNewNote] = useState('');
  
  // Status mesajları
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');
  
  const showStatusMessage = (message: string, type: 'success' | 'error') => {
    setStatusMessage(message);
    setStatusType(type);
    
    // 3 saniyə sonra mesajı təmizlə
    setTimeout(() => {
      setStatusMessage('');
      setStatusType('');
    }, 3000);
  };
  
  // Yeni element əlavə etmək
  const handleAddItem = () => {
    try {
      let success = false;
      let item = '';
      
      switch (activeTab) {
        case 'brands':
          item = newBrand.trim();
          if (!item) return showStatusMessage('Brend adı daxil edin', 'error');
          success = addBrand(item);
          setNewBrand('');
          break;
        
        case 'categories':
          item = newCategory.trim();
          if (!item) return showStatusMessage('Kateqoriya adı daxil edin', 'error');
          success = addCategory(item);
          setNewCategory('');
          break;
        
        case 'sizes':
          item = newSize.trim();
          if (!item) return showStatusMessage('Ölçü daxil edin', 'error');
          success = addBottleSize(item);
          setNewSize('');
          break;
        
        case 'concentrations':
          item = newConcentration.trim();
          if (!item) return showStatusMessage('Konsentrasiya adı daxil edin', 'error');
          success = addConcentration(item);
          setNewConcentration('');
          break;
        
        case 'groups':
          item = newGroup.trim();
          if (!item) return showStatusMessage('Ətir qrupu adı daxil edin', 'error');
          success = addFragranceGroup(item);
          setNewGroup('');
          break;
        
        case 'notes':
          item = newNote.trim();
          if (!item) return showStatusMessage('Not adı daxil edin', 'error');
          success = addNote(activeNoteType, item);
          setNewNote('');
          break;
      }
      
      if (success) {
        showStatusMessage(`${item} uğurla əlavə edildi`, 'success');
      } else {
        showStatusMessage(`${item} artıq mövcuddur`, 'error');
      }
    } catch (error) {
      showStatusMessage('Xəta baş verdi', 'error');
      console.error('Element əlavə edilərkən xəta:', error);
    }
  };
  
  // Kataloq məlumatlarını sıfırlamaq
  const handleReset = () => {
    if (window.confirm('Bütün kataloq məlumatları ilkin vəziyyətə qaytarılacaq. Bu əməliyyatı geri ala bilməzsiniz. Davam etmək istəyirsiniz?')) {
      resetCatalogData();
      showStatusMessage('Kataloq məlumatları sıfırlandı', 'success');
    }
  };
  
  // Enter düyməsinə basıldıqda əlavə etmək
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-40">Yüklənir...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Kataloq Məlumatlarını İdarə Et</h2>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-md flex items-center text-sm hover:bg-red-100 transition-colors"
        >
          <RefreshCw size={16} className="mr-1.5" />
          Sıfırla
        </button>
      </div>
      
      {/* Status mesajı */}
      {statusMessage && (
        <div className={`mb-4 p-3 rounded-md flex items-center ${
          statusType === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {statusType === 'success' ? (
            <CheckCircle size={18} className="mr-2 text-green-500" />
          ) : (
            <AlertCircle size={18} className="mr-2 text-red-500" />
          )}
          {statusMessage}
        </div>
      )}
      
      {/* Tab menyu */}
      <div className="mb-6 border-b">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'brands' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('brands')}
          >
            Brendlər
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'categories' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('categories')}
          >
            Kateqoriyalar
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'sizes' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('sizes')}
          >
            Ölçülər
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'concentrations' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('concentrations')}
          >
            Konsentrasiyalar
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'groups' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('groups')}
          >
            Ətir Qrupları
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'notes' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('notes')}
          >
            Notlar
          </button>
        </div>
      </div>
      
      {/* Not tipləri (yalnız notes tab seçildikdə göstərilir) */}
      {activeTab === 'notes' && (
        <div className="mb-4 flex gap-3">
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeNoteType === 'top' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveNoteType('top')}
          >
            Yuxarı notlar
          </button>
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeNoteType === 'middle' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveNoteType('middle')}
          >
            Orta notlar
          </button>
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeNoteType === 'base' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveNoteType('base')}
          >
            Baza notları
          </button>
        </div>
      )}
      
      {/* Yeni element əlavə etmə formu */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {activeTab === 'brands' && 'Yeni brend əlavə et'}
          {activeTab === 'categories' && 'Yeni kateqoriya əlavə et'}
          {activeTab === 'sizes' && 'Yeni ölçü əlavə et'}
          {activeTab === 'concentrations' && 'Yeni konsentrasiya əlavə et'}
          {activeTab === 'groups' && 'Yeni ətir qrupu əlavə et'}
          {activeTab === 'notes' && `Yeni ${activeNoteType === 'top' ? 'yuxarı' : activeNoteType === 'middle' ? 'orta' : 'baza'} not əlavə et`}
        </label>
        
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60"
            placeholder={`Yeni ${
              activeTab === 'brands' ? 'brend' :
              activeTab === 'categories' ? 'kateqoriya' :
              activeTab === 'sizes' ? 'ölçü' :
              activeTab === 'concentrations' ? 'konsentrasiya' :
              activeTab === 'groups' ? 'ətir qrupu' : 'not'
            } adı`}
            value={
              activeTab === 'brands' ? newBrand :
              activeTab === 'categories' ? newCategory :
              activeTab === 'sizes' ? newSize :
              activeTab === 'concentrations' ? newConcentration :
              activeTab === 'groups' ? newGroup : newNote
            }
            onChange={(e) => {
              if (activeTab === 'brands') setNewBrand(e.target.value);
              else if (activeTab === 'categories') setNewCategory(e.target.value);
              else if (activeTab === 'sizes') setNewSize(e.target.value);
              else if (activeTab === 'concentrations') setNewConcentration(e.target.value);
              else if (activeTab === 'groups') setNewGroup(e.target.value);
              else setNewNote(e.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded-md flex items-center hover:bg-primary/90 transition-colors"
            onClick={handleAddItem}
          >
            <Plus size={18} className="mr-1" />
            Əlavə et
          </button>
        </div>
      </div>
      
      {/* Mövcud elementlərin siyahısı */}
      <div className="border rounded-md overflow-hidden">
        <div className="p-3 bg-gray-50 border-b">
          <h3 className="font-medium text-gray-700">
            {activeTab === 'brands' && 'Brendlər'}
            {activeTab === 'categories' && 'Kateqoriyalar'}
            {activeTab === 'sizes' && 'Ölçülər'}
            {activeTab === 'concentrations' && 'Konsentrasiyalar'}
            {activeTab === 'groups' && 'Ətir Qrupları'}
            {activeTab === 'notes' && `${activeNoteType === 'top' ? 'Yuxarı' : activeNoteType === 'middle' ? 'Orta' : 'Baza'} Notlar`}
          </h3>
        </div>
        
        <div className="max-h-64 overflow-y-auto p-3">
          <div className="flex flex-wrap gap-2">
            {activeTab === 'brands' && catalogData.brands.map((brand, idx) => (
              <div key={idx} className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-md">
                {brand}
              </div>
            ))}
            
            {activeTab === 'categories' && catalogData.categories.map((category, idx) => (
              <div key={idx} className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-md">
                {category}
              </div>
            ))}
            
            {activeTab === 'sizes' && catalogData.bottleSizes.map((size, idx) => (
              <div key={idx} className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-md">
                {size}
              </div>
            ))}
            
            {activeTab === 'concentrations' && catalogData.concentrations.map((concentration, idx) => (
              <div key={idx} className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-md">
                {concentration}
              </div>
            ))}
            
            {activeTab === 'groups' && catalogData.fragranceGroups.map((group, idx) => (
              <div key={idx} className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-md">
                {group}
              </div>
            ))}
            
            {activeTab === 'notes' && catalogData.notes[activeNoteType].map((note, idx) => (
              <div key={idx} className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-md">
                {note}
              </div>
            ))}
            
            {((activeTab === 'brands' && catalogData.brands.length === 0) ||
              (activeTab === 'categories' && catalogData.categories.length === 0) ||
              (activeTab === 'sizes' && catalogData.bottleSizes.length === 0) ||
              (activeTab === 'concentrations' && catalogData.concentrations.length === 0) ||
              (activeTab === 'groups' && catalogData.fragranceGroups.length === 0) ||
              (activeTab === 'notes' && catalogData.notes[activeNoteType].length === 0)) && (
              <div className="text-gray-500 text-sm">Heç bir element tapılmadı</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Qısa istifadə təlimatı */}
      <div className="mt-6 text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
        <p><strong>Məlumat:</strong> Əlavə etdiyiniz yeni elementlər avtomatik olaraq məhsul əlavə etmə formasında görünəcək. Kataloq məlumatları brauzer yaddaşında saxlanılır.</p>
      </div>
    </div>
  );
};

export default CatalogManager; 