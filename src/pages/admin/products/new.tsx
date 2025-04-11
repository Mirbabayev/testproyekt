import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProductForm from '../../../components/admin/AddProductForm';
import { products as allProducts } from '../../../data/products';

// Not tipləri
type NoteType = 'top' | 'middle' | 'base';

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
  image: string;
}

export default function NewProduct() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (formData: ProductFormData) => {
    setIsSubmitting(true);
    
    try {
      // Məhsul ID-sini yaradırıq
      const newId = String(allProducts.length + 1);
      
      // Məlumatları hazırlayırıq
      const newProduct = {
        id: newId,
        name: formData.name,
        brand: formData.brand,
        description: formData.description || "Məhsul haqqında məlumat verilməyib",
        image: formData.image || "https://via.placeholder.com/500x500?text=No+Image",
        price: Number(formData.price),
        rating: 0,
        gender: formData.gender,
        size: formData.size || "100ml",
        concentration: formData.concentration || "Eau de Parfum",
        notes: formData.notes,
        inStock: formData.inStock,
        category: formData.category,
        popularity: 0
      };
      
      // Burada məhsulu verilənlər bazasına əlavə edəcəyik
      // Bu nümunədə yalnız simulyasiya edirik
      console.log("Yeni məhsul:", newProduct);
      
      // LocalStorage-ə məhsulu əlavə edək
      const storedProducts = localStorage.getItem('products');
      let products = storedProducts ? JSON.parse(storedProducts) : [...allProducts];
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));
      
      // Məhsullar səhifəsinə yönləndiririk
      alert("Məhsul uğurla əlavə edildi!");
      navigate('/admin/products');
    } catch (error) {
      console.error("Məhsul əlavə edilərkən xəta baş verdi:", error);
      alert("Məhsul əlavə edilərkən xəta baş verdi!");
    } finally {
      setIsSubmitting(false);
  }
  };
  
  return (
    <div className="container mx-auto py-6">
      <AddProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
  );
} 