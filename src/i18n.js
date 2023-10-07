import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from "./local/en.json";
import AR from "./local/ar.json";
import  LanguageDetector  from "i18next-browser-languagedetector";
const resources = {
  en: {
    translation: EN,
  },
  ar: {
    translation: AR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
