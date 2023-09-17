import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files

import translationUS from "./locales/us/translation.json";
import translationES from "./locales/es/translation.json";
import translationIT from "./locales/it/translation.json";
import translationFI from "./locales/fi/translation.json";
import translationGB from "./locales/gb/translation.json";


//Creating object with the variables of imported translation files
const resources = {
    us: {
        translation: translationUS,
    },
    es: {
        translation: translationES,
    },
    it: {
        translation: translationIT
    },
    fi: {
        translation: translationFI
    },
    gb: {
        translation: translationGB
    }
};

//i18N Initialization

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "us", //default language
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
