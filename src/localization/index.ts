import i18n, {
  LanguageDetectorAsyncModule,
  Services,
  InitOptions,
} from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-community/async-storage";
import * as Localization from 'expo-localization';
import en from "./en";
import de from "./de";

export const AVAILABLE_LANGUAGES = {
  en,
  de,
};

const AVAILABLE_LANG_CODES = Object.keys(AVAILABLE_LANGUAGES);

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  // If this is set to true, your detect function receives a callback function that you should call with your language,
  //useful to retrieve your language stored in AsyncStorage for example
  async: true,
  init: (
    _services: Services,
    _detectorOptions: object,
    _i18nextOptions: InitOptions
  ) => {
    /* use services and options */
  },
  detect: (callback: (lng: string) => void) => {
    AsyncStorage.getItem("APP_LANG", (err, lng) => {
      // Handle error fetching stored data or no data stored case
      if (err || !lng) {
        if (err) {
          console.log('Error fetching "APP_LANG" from async store', err);
        } else {
          console.log(
            "No language is set, choosing the best available or English as fallback"
          );
        }
        
        const bestLng = Localization.locale;

        callback(bestLng? bestLng : "en");
        return;
      }
      callback(lng);
    });
  },
  cacheUserLanguage: (lng: string) => AsyncStorage.setItem("APP_LANG", lng),
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: AVAILABLE_LANGUAGES,
    react: {
      useSuspense: false,
    },
    defaultNS: "common",
  });
