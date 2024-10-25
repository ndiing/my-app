import { configureLocalization } from "@lit/localize";
import { sourceLocale, targetLocales } from "../../generated/locale-codes.js";

/**
 * Mengambil kode lokal saat ini.
 *
 * @function getLocale
 * @returns {string} Kode lokal saat ini.
 */

/**
 * Mengatur kode lokal untuk aplikasi.
 *
 * @function setLocale
 * @param {string} locale - Kode lokal yang ingin diatur.
 * @throws {Error} Jika kode lokal yang diberikan tidak valid.
 */

export const { getLocale, setLocale } = configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: (locale) => import(`../../generated/locales/${locale}.js`),
});

// console.log(sourceLocale)
// console.log(targetLocales)
// console.log(getLocale())
// console.log(setLocale('zh-Hans'))
