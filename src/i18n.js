import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationKo from "./locales/ko/translation.json";
import translationEn from "./locales/en/translation.json";
import translationJp from "./locales/jp/translation.json";
import translationCn from "./locales/cn/translation.json";
import { isNull } from "./utils/NullUtils";
import { getCookie } from "./utils/ReactCookie";

const resources = {
  KO: {
    translation: translationKo,
  },
  EN: {
    translation: translationEn,
  },
  JP: {
    translation: translationJp,
  },
  CN: {
    translation: translationCn,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: isNull(getCookie("language")) ? "KO" : getCookie("language"),
    fallbackLng: "EN",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
