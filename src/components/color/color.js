import { Hct, themeFromImage } from "@material/material-color-utilities";
import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";

/**
 * Mengatur tema berdasarkan gambar atau kode warna hex.
 *
 * @async
 * @function setTheme
 * @param {string | Image} hex_image - Gambar atau kode warna hex yang akan digunakan untuk menentukan tema.
 * @returns {Promise<void>} Promise yang menyelesaikan ketika tema berhasil diterapkan.
 * @throws {Error} Jika `hex_image` bukan tipe yang valid.
 */
async function setTheme(hex_image) {
    let theme;

    if (hex_image instanceof Image) theme = await themeFromImage(hex_image);
    else theme = themeFromSourceColor(argbFromHex(hex_image), []);

    const light = {
        surfaceDim: theme.palettes.neutral.tone(87),
        surfaceBright: theme.palettes.neutral.tone(98),
        surfaceContainerLowest: theme.palettes.neutral.tone(100),
        surfaceContainerLow: theme.palettes.neutral.tone(96),
        surfaceContainer: theme.palettes.neutral.tone(94),
        surfaceContainerHigh: theme.palettes.neutral.tone(92),
        surfaceContainerHighest: theme.palettes.neutral.tone(90),
    };

    for (const name in light) {
        const value = light[name];
        theme.schemes.light.props[name] = value;
    }

    const dark = {
        surfaceDim: theme.palettes.neutral.tone(6),
        surfaceBright: theme.palettes.neutral.tone(24),
        surfaceContainerLowest: theme.palettes.neutral.tone(4),
        surfaceContainerLow: theme.palettes.neutral.tone(10),
        surfaceContainer: theme.palettes.neutral.tone(12),
        surfaceContainerHigh: theme.palettes.neutral.tone(17),
        surfaceContainerHighest: theme.palettes.neutral.tone(22),
    };

    for (const name in dark) {
        const value = light[name];
        theme.schemes.dark.props[name] = value;
    }

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    applyTheme(theme, { target: document.body, dark: systemDark });
}

export { setTheme };

// setTheme("#f82506");
// const image = new Image();
// image.src = "./images/icon.png";
// setTheme(image);
