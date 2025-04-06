import React from 'react';
import { useCart } from '../../lib/cart-context';
import { Link } from 'react-router-dom';
import { MinusCircle, PlusCircle, Trash2, ArrowLeft, AlertCircle } from 'lucide-react';

export default function Cart() {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Səbət</h1>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <AlertCircle size={48} className="text-gray-400" />
            <p className="text-lg">Səbətiniz boşdur</p>
            <p className="text-gray-500 mb-4">Səbətinizə məhsul əlavə etməyə başlayın</p>
            <Link to="/products" className="btn-primary inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Məhsullara baxın
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Səbət</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Məhsullar</h2>
              <button 
                onClick={clearCart}
                className="text-red-500 text-sm hover:text-red-700 transition-colors flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1" /> Səbəti təmizlə
              </button>
            </div>
            
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                    <Link to={`/products/${item.id}`}>
                      <img 
                        src={item.image || '/images/placeholder.jpg'} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                      />
                    </Link>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <p className="text-xs text-gray-500 uppercase">{item.brand}</p>
                        <Link to={`/products/${item.id}`} className="font-medium hover:text-primary transition-colors">
                          {item.name}
                        </Link>
                      </div>
                      <p className="font-bold mt-1 sm:mt-0">{item.price} ₼</p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="inline-flex items-center">
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          className="text-gray-500 hover:text-primary transition-colors"
                          aria-label="Azalt"
                        >
                          <MinusCircle size={18} />
                        </button>
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => increaseQuantity(item.id)}
                          className="text-gray-500 hover:text-primary transition-colors"
                          aria-label="Artır"
                        >
                          <PlusCircle size={18} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors flex items-center"
                        aria-label="Sil"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <Link to="/products" className="text-primary hover:underline flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Alış-verişə davam edin
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-lg font-semibold mb-4">Sifariş Xülasəsi</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Məhsullar ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>{totalPrice.toFixed(2)} ₼</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Çatdırılma</span>
                <span>Pulsuz</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                <span>Cəmi</span>
                <span>{totalPrice.toFixed(2)} ₼</span>
              </div>
            </div>
            
            <button 
              className="bg-black text-white py-3 px-4 rounded-md w-full hover:bg-primary transition-colors duration-300"
            >
              Sifarişi tamamla
            </button>
            
            <div className="mt-4 text-xs text-gray-500">
              <p className="mb-2">Ödəniş üsulları:</p>
              <div className="flex space-x-2">
                <span className="border border-gray-300 rounded px-2 py-1">Visa</span>
                <span className="border border-gray-300 rounded px-2 py-1">MasterCard</span>
                <span className="border border-gray-300 rounded px-2 py-1">Nağd</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}