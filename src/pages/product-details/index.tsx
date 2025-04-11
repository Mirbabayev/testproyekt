import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronRight, Clock, Gift, Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/product-card';
import { useWishlist } from '../../lib/wishlist-context';
import { useCart } from '../../lib/cart-context';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  // URL-dən gələn ID ilə məhsulu tap
  const product = products.find(p => p.id === id);
  
  // Əgər məhsul tapılmazsa Ana səhifəyə yönləndir
  useEffect(() => {
    if (!product && id) {
      console.log("Məhsul tapılmadı, ID:", id);
      navigate('/products');
    }
  }, [product, navigate, id]);
  
  // Məhsul tapılmadığı halda
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Məhsul tapılmadı</h1>
          <p className="text-gray-600 mb-6">Axtardığınız məhsul mövcud deyil və ya silinib.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
          >
            Məhsullara qayıt
          </Link>
        </div>
      </div>
    );
  }
  
  // Eyni cinsdə olan məhsulları göstər (oxşar məhsullar)
  const similarProducts = products
    .filter(p => p.gender === product.gender && p.id !== product.id)
    .slice(0, 4);
    
  // Eyni ətir ailəsindən olan məhsullar (Bunları da bəyənə bilərsiniz)
  const recommendedProducts = products
    .filter(p => 
      p.id !== product.id && 
      p.fragranceFamily === product.fragranceFamily && 
      p.id !== similarProducts[0]?.id && 
      p.id !== similarProducts[1]?.id && 
      p.id !== similarProducts[2]?.id && 
      p.id !== similarProducts[3]?.id
    )
    .slice(0, 4);
    
  // Əgər eyni ətir ailəsindən kifayət qədər məhsul yoxdursa, populyar məhsullar ilə tamamla
  if (recommendedProducts.length < 4) {
    const popularProducts = products
      .filter(p => 
        p.id !== product.id && 
        !recommendedProducts.some(rp => rp.id === p.id) && 
        !similarProducts.some(sp => sp.id === p.id)
      )
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4 - recommendedProducts.length);
      
    recommendedProducts.push(...popularProducts);
  }
  
  // Miqdarı artır
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // Miqdarı azalt
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Seçilmişlərə əlavə et/çıxar
  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Məhsulu səbətə əlavə et
  const handleAddToCart = () => {
    addToCart(product);
  };

  // Notları bölmələrə ayır
  const notes = {
    top: product.notes.slice(0, 2),
    middle: product.notes.slice(2, 4),
    base: product.notes.slice(4)
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Breadcrumb */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center text-sm text-gray-500 mb-6"
      >
        <Link to="/" className="hover:text-primary">Ana səhifə</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link to="/products" className="hover:text-primary">Parfümlər</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-primary">{product.name}</span>
      </motion.div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Məhsul şəkli */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="product-detail-image bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm p-10 flex items-center justify-center h-[500px] overflow-hidden transition-all duration-300 hover:shadow-md group">
            <motion.img 
              src={product.image} 
              alt={`${product.brand} ${product.name} ətri`}
              title={`${product.brand} ${product.name}`}
              className="product-image max-h-[450px] max-w-[90%] h-auto w-auto object-contain transition-all duration-500 group-hover:scale-[1.05]" 
              style={{ mixBlendMode: 'multiply' }}
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://dummyimage.com/400x400/f0f0f0/333333.png&text=Şəkil+yoxdur";
                target.onerror = null;
              }}
            />
          </div>
        </motion.div>
        
        {/* Məhsul detalları */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-2">
            <span className="bg-accent/80 text-primary px-3 py-1 rounded-md text-xs font-medium inline-block">
              {product.gender === 'kişi' ? 'Kişi' : product.gender === 'qadın' ? 'Qadın' : 'Uniseks'}
            </span>
            {product.inStock ? (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-medium inline-block ml-2">
                Stokda var
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs font-medium inline-block ml-2">
                Stokda yoxdur
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
          <div className="text-lg text-primary font-medium mb-4">{product.brand}</div>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-600">{product?.rating}</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-primary mb-8">{product?.price} ₼</div>
          
          {/* İstək siyahısına əlavə et & Səbətə əlavə et */}
          <div className="flex flex-wrap gap-4 mb-8">
            {/* Miqdar seçimi */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="w-10 h-10 flex items-center justify-center text-gray-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <button 
              onClick={toggleWishlist}
              className={`flex items-center justify-center px-4 py-2 rounded-md ${
                isInWishlist(product.id) 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              } transition-colors`}
              title={isInWishlist(product.id) ? 'İstək siyahısından çıxar' : 'İstək siyahısına əlavə et'}
            >
              <Heart className={`h-5 w-5 mr-2 ${isInWishlist(product.id) ? 'fill-primary text-primary' : ''}`} />
              {isInWishlist(product.id) ? 'İstək siyahısındadır' : 'İstək siyahısına əlavə et'}
            </button>
            
            <button 
              onClick={handleAddToCart}
              className="flex items-center justify-center px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              disabled={!product.inStock}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Səbətə əlavə et
            </button>
          </div>
          
          {/* Qısa məlumat */}
          <div className="prose prose-sm mb-8">
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          {/* Xüsusiyyətlər */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-start">
              <div className="bg-accent/50 p-2 rounded-md mr-3">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Davamlılıq</h3>
                <p className="text-sm text-gray-600">{product.longevity}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-accent/50 p-2 rounded-md mr-3">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Ətir ailəsi</h3>
                <p className="text-sm text-gray-600">{product.fragranceFamily}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-accent/50 p-2 rounded-md mr-3">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Konseptləşdirmə</h3>
                <p className="text-sm text-gray-600">{product.concentration}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Əlavə məlumat bölmələri */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Məhsul haqqında</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ətir notları</h3>
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Üst notlar:</h4>
                <p className="text-sm text-gray-600">{notes.top.join(', ')}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Orta notlar:</h4>
                <p className="text-sm text-gray-600">{notes.middle.join(', ')}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Baza notları:</h4>
                <p className="text-sm text-gray-600">{notes.base.join(', ')}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">İstifadə tövsiyələri</h3>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-4">
                Parfümünüzü ən yaxşı şəkildə istifadə etmək üçün:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
                <li>Nəbz nöqtələrinə tətbiq edin (biləklər, boyun, qulaq arxası)</li>
                <li>Dəri təmiz və nəmli olduqda tətbiq edin</li>
                <li>Dəriyə 15-20 sm məsafədən püskürtün</li>
                <li>Tətbiqdən sonra ovuşdurmayın</li>
                <li>Davamlılığı artırmaq üçün uyğun bir bədən losyonu ilə birlikdə istifadə edin</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Saxlama şərtləri</h3>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-4">
                Parfümünüzün keyfiyyətini və təravətini qorumaq üçün:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
                <li>Sərin, quru yerdə saxlayın</li>
                <li>Birbaşa günəş işığından qoruyun</li>
                <li>Yüksək temperaturdan uzaq tutun</li>
                <li>Məhsulu orijinal qutusunda saxlayın</li>
                <li>Şüşə flakonu düşməyin və silkələməyin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Oxşar məhsullar */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Oxşar məhsullar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Bunları da bəyənə bilərsiniz */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bunları da bəyənə bilərsiniz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;