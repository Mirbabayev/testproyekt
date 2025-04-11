import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Dil resursları
const resources = {
  az: {
    translation: {
      "header": {
        "home": "Ana səhifə",
        "products": "Məhsullar",
        "wishlist": "Seçilmişlər",
        "cart": "Səbət",
        "login": "Daxil ol",
        "register": "Qeydiyyat",
        "profile": "Profil",
        "language": "Dil"
      },
      "product": {
        "addToCart": "Səbətə əlavə et",
        "inWishlist": "Seçilmişlərdədir",
        "inStock": "Stokda var",
        "outOfStock": "Stokda yoxdur"
      }
    }
  },
  en: {
    translation: {
      "header": {
        "home": "Home",
        "products": "Products",
        "wishlist": "Wishlist",
        "cart": "Cart",
        "login": "Login",
        "register": "Register",
        "profile": "Profile",
        "language": "Language"
      },
      "product": {
        "addToCart": "Add to Cart",
        "inWishlist": "In Wishlist",
        "inStock": "In Stock",
        "outOfStock": "Out of Stock"
      }
    }
  },
  ru: {
    translation: {
      "header": {
        "home": "Главная",
        "products": "Товары",
        "wishlist": "Избранное",
        "cart": "Корзина",
        "login": "Вход",
        "register": "Регистрация",
        "profile": "Профиль",
        "language": "Язык"
      },
      "product": {
        "addToCart": "В корзину",
        "inWishlist": "В избранном",
        "inStock": "В наличии",
        "outOfStock": "Нет в наличии"
      }
    }
  },
  tr: {
    translation: {
      "header": {
        "home": "Ana Sayfa",
        "products": "Ürünler",
        "wishlist": "Favoriler",
        "cart": "Sepet",
        "login": "Giriş",
        "register": "Kayıt Ol",
        "profile": "Profil",
        "language": "Dil"
      },
      "product": {
        "addToCart": "Sepete Ekle",
        "inWishlist": "Favorilerde",
        "inStock": "Stokta",
        "outOfStock": "Tükendi"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  // Konfiqurasiya
  .init({
    resources,
    lng: 'az', // Default dil
    fallbackLng: 'az',
    
    interpolation: {
      escapeValue: false, // React özü XSS-dən qoruyur
    }
  });

export default i18n; 