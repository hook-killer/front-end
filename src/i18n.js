import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationKo from "./locales/ko/translation.json";
import translationEn from "./locales/en/translation.json";
import translationJp from "./locales/jp/translation.json";
import translationCn from "./locales/cn/translation.json";

const resources = {
  ko: {
    translation: translationKo
  },
  en: {
    translation: translationEn
  },
  jp: {
    translation: translationJp
  },
  cn: {
    translation: translationCn
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'ko',
    fallbackLng: 'cn',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
