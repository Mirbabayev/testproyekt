import { useState } from 'react';
import { X, Plus, Save, Trash2, Search } from 'lucide-react';

interface CategoryManagerProps {
  existingCategories: string[];
  onSaveCategories: (categories: string[]) => void;
}

export const CategoryManager = ({ existingCategories, onSaveCategories }: CategoryManagerProps) => {
  const [categories, setCategories] = useState<string[]>(existingCategories);
  const [newCategory, setNewCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  const filteredCategories = () => {
    if (!searchTerm.trim()) return categories;
    
    return categories.filter(category => 
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSaveCategories = () => {
    onSaveCategories(categories);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center gap-2"
      >
        <Plus size={16} /> Kateqoriyaları idarə et
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Kateqoriyaları idarə et</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Yeni kateqoriya əlavə et"
                className="flex-grow px-4 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
              >
                <Plus size={16} /> Əlavə et
              </button>
            </div>
            
            <div className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Kateqoriya axtar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-8 pr-10 border border-green-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green-500" size={16} />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-700"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
            
            <div className="border border-green-200 rounded-md p-4 mb-4 bg-green-50/50 max-h-60 overflow-y-auto">
              {filteredCategories().length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {filteredCategories().map((category, index) => (
                    <div key={index} className="flex items-center">
                      <span className="flex-grow text-sm">{category}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-green-500">
                  <p>Axtarışınıza uyğun kateqoriya tapılmadı</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-green-200 text-green-700 rounded-md hover:bg-green-50 transition-colors"
              >
                Ləğv et
              </button>
              <button
                type="button"
                onClick={handleSaveCategories}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Save size={16} /> Yadda saxla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 