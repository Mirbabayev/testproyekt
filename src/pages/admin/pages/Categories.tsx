import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, X, CheckCircle, AlertTriangle } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Parfum',
      description: 'Yüksək konsentrasiyalı ətir',
      products: 25
    },
    {
      id: '2',
      name: 'Eau de Parfum',
      description: 'Orta konsentrasiyalı ətir',
      products: 42
    },
    {
      id: '3',
      name: 'Eau de Toilette',
      description: 'Yüngül konsentrasiyalı ətir',
      products: 38
    },
    {
      id: '4',
      name: 'Cologne',
      description: 'Çox yüngül konsentrasiyalı ətir',
      products: 15
    },
    {
      id: '5',
      name: 'Hədiyyə dəstləri',
      description: 'Xüsusi hədiyyə dəstləri',
      products: 8
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  // Silmə üçün state-lər
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openModal = (index?: number) => {
    if (index !== undefined) {
      setEditIndex(index);
      setNewCategory({
        name: categories[index].name,
        description: categories[index].description
      });
    } else {
      setEditIndex(null);
      setNewCategory({ name: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCategory({ name: '', description: '' });
    setEditIndex(null);
  };
  
  // Silmə modalını açan funksiya
  const openDeleteModal = (index: number) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
    setIsSuccess(false);
  };
  
  // Silmə modalını bağlayan funksiya
  const closeDeleteModal = () => {
    setDeleteIndex(null);
    setIsDeleteModalOpen(false);
    setIsProcessing(false);
    setIsSuccess(false);
  };
  
  // Kateqoriyanı silən funksiya
  const handleDeleteCategory = () => {
    if (deleteIndex === null) return;
    
    setIsProcessing(true);
    
    // Simulyasiya edilmiş API sorğusu
    setTimeout(() => {
      const filteredCategories = categories.filter((_, index) => index !== deleteIndex);
      setCategories(filteredCategories);
      setIsProcessing(false);
      setIsSuccess(true);
      
      // 2 saniyə sonra modalı bağla
      setTimeout(() => {
        closeDeleteModal();
      }, 2000);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategory.name) return;
    
    if (editIndex !== null) {
      // Update existing category
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = {
        ...updatedCategories[editIndex],
        name: newCategory.name,
        description: newCategory.description
      };
      setCategories(updatedCategories);
    } else {
      // Add new category
      const newId = (categories.length + 1).toString();
      setCategories([
        ...categories,
        {
          id: newId,
          name: newCategory.name,
          description: newCategory.description,
          products: 0
        }
      ]);
    }
    
    closeModal();
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Kateqoriyalar ({categories.length})
        </h2>
        <button
          onClick={() => openModal()}
          className="px-3 py-2 flex items-center text-sm gap-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          Yeni Kateqoriya
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kateqoriya
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Təsvir
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Məhsullar
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Əməliyyatlar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-md mr-3">
                      <Tag size={16} className="text-primary" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{category.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  {category.products}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => openModal(index)} 
                      className="p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-colors"
                      title="Düzəliş et"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => openDeleteModal(index)}
                      className="p-1.5 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-colors"
                      title="Sil"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Yeni kateqoriya əlavə et modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative bg-white rounded-lg max-w-md w-full mx-auto translate-y-0 animate-fadeIn">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium">
                  {editIndex !== null ? 'Kateqoriyani Redaktə Et' : 'Yeni Kateqoriya Əlavə Et'}
                </h3>
                <button 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={closeModal}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Kateqoriya adı
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Təsvir
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {editIndex !== null ? 'Yadda saxla' : 'Əlavə et'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Kateqoriyanı sil modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative bg-white rounded-lg max-w-md w-full mx-auto translate-y-0 animate-fadeIn">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium">Kateqoriyanı Sil</h3>
                <button 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={closeDeleteModal}
                  disabled={isProcessing}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                {isSuccess ? (
                  <div className="bg-green-50 p-4 rounded-md text-green-800 flex items-center">
                    <CheckCircle className="mr-2" size={20} />
                    <span>Kateqoriya uğurla silindi!</span>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 text-gray-700">
                      <p>
                        <strong>{deleteIndex !== null ? categories[deleteIndex].name : ''}</strong> kateqoriyasını silmək istədiyinizə əminsiniz?
                      </p>
                      {deleteIndex !== null && categories[deleteIndex].products > 0 && (
                        <p className="mt-2">
                          Bu kateqoriyada <strong>{categories[deleteIndex].products}</strong> məhsul var.
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm mb-4">
                      <AlertTriangle className="inline-block mr-1" size={16} />
                      Diqqət: Bu əməliyyat geri qaytarıla bilməz.
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={closeDeleteModal}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        disabled={isProcessing}
                      >
                        İmtina
                      </button>
                      <button
                        onClick={handleDeleteCategory}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            İcra edilir...
                          </>
                        ) : (
                          "Sil"
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories; 