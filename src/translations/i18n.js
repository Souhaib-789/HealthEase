import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './english.json';
import urTranslation from './urdu.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    lng: 'en',
    resources: {
      en: {
        translation: enTranslation
      },
      ur: {
        translation: urTranslation,
      },
        
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    // backend: {
    //   // for using backend to load translations
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    // },
    // cache: {
    //   enabled: true,
    //   prefix: 'i18next_res_',
    //   expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    //   store: AsyncStorage,
    // },
  });

export default i18n;