// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";

export default [
    // Aturan dasar untuk semua file JS
    {
        files: ["*.js", "*.mjs"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            ...js.configs.recommended.rules,
        },
    },

    // Mengabaikan file di folder src/generated/locales/
    {
        ignores: ["src/generated/locales/*.js"], // Abaikan semua file di folder ini
    },

    // Aturan untuk file Node.js dan file konfigurasi lainnya
    {
        files: ["forge.config.js", "postcss.config.js", "webpack.*.js", "webpack.rules.js", "src/api/**/*.js"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "no-console": "off",
            "no-undef": "off",
        },
    },

    // Aturan untuk file web di src/components/
    {
        files: ["src/components/**/*.js"],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            "no-alert": "warn",
            "no-console": "warn",
            "lines-between-class-members": ["error", "always"], // Tambahkan garis kosong antara class methods
        },
    },
];
