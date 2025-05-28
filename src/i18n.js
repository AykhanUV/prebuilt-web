import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
   .use(HttpApi)
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
     fallbackLng: 'en',
    supportedLngs: ['en', 'az', 'tr', 'ru', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh-CN', 'hi', 'ar', 'bn', 'ur', 'id', 'nl', 'pl', 'sv', 'uk', 'ro', 'cs', 'hu'],
    detection: {
           order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
           caches: ['localStorage'],
         },
    backend: {
           loadPath: '/locales/{{lng}}.json',
         },
    react: {
           useSuspense: true,
         },
  });

export default i18n;