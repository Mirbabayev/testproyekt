import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';

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
        <h2 className="text-xl font-semibold text-gray-800">Kateqoriyalar</h2>
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
                      className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                    >
                      <Edit size={14} /> Düzəliş et
                    </button>
                    <button className="text-red-600 hover:text-red-900 flex items-center gap-1">
                      <Trash2 size={14} /> Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding/editing categories */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editIndex !== null ? 'Kateqoriyaya düzəliş et' : 'Yeni kateqoriya əlavə et'}
            </h3>
            <form onSubmit={handleSubmit}>
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
      )}
    </div>
  );
};

export default Categories; 