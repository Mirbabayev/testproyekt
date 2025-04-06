import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  az: {
    translation: {
      // Header
      header: {
        login: 'Daxil ol',
        register: 'Qeydiyyat'
      },
      
      // Auth
      auth: {
        email: 'E-poçt',
        password: 'Şifrə',
        confirmPassword: 'Şifrəni təsdiqlə',
        forgotPassword: 'Şifrəni unutmusunuz?'
      },
      
      // Common
      common: {
        loading: 'Yüklənir...',
        error: 'Xəta baş verdi',
        retry: 'Yenidən cəhd edin'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'az',
    fallbackLng: 'az',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;