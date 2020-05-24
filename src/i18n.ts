import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'ua',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
    backend: {
      loadPath: process.env.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      transSupportBasicHtmlNodes: true,
    },
  })
  .then()

export default i18n
