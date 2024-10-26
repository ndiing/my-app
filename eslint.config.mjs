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
            // 'semi': ['error', 'always'],
            // 'quotes': ['error', 'single'],
            // 'curly': 'error',
            // 'indent': ['error', 4],
            "no-unused-vars": "warn",
            // 'no-console': 'warn',
            // 'linebreak-style': ['error', 'unix'],
            "prefer-const": "error",
            // 'no-mixed-spaces-and-tabs': 'error',
            // 'max-len': ['warn', { code: 80 }],
            "lines-between-class-members": ["error", "always"],
            "prefer-arrow-callback": "error",
        },
    },
];
