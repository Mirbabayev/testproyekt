import { useCart } from '../../lib/cart-context';
import { ShoppingBag, Minus, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h2 className="text-3xl font-light tracking-[0.2em] mb-4">SƏBƏTİNİZ BOŞDUR</h2>
          <p className="text-gray-600 mb-8 tracking-wide">
            Səbətinizdə hələ heç bir məhsul yoxdur.
          </p>
          <Link 
            to="/products" 
            className="inline-block px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 tracking-[0.2em] uppercase"
          >
            Alış-verişə davam et
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Səbət ({items.length} məhsul)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Məhsullar siyahısı */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
              {/* Məhsul şəkli */}
              <Link to={`/products/${item.id}`} className="w-24 h-24 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </Link>
              
              {/* Məhsul məlumatları */}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <Link 
                      to={`/products/${item.id}`}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Məhsulu sil"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Qiymət və miqdar */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-medium">
                    {(item.price * item.quantity).toFixed(2)} ₼
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Sifariş xülasəsi */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Sifariş xülasəsi</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Məhsullar ({items.length})</span>
                <span>{totalPrice.toFixed(2)} ₼</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Çatdırılma</span>
                <span className="text-green-600">Pulsuz</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-semibold">
                <span>Ümumi</span>
                <span>{totalPrice.toFixed(2)} ₼</span>
              </div>
            </div>
            
            <button className="lelabo-btn w-full">
              Sifarişi rəsmiləşdir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}