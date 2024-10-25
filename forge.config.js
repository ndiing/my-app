const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
    packagerConfig: {
        asar: true,
        icon: "images/icon", // no file extension required
    },
    rebuildConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                // An URL to an ICO file to use as the application icon (displayed in Control Panel > Programs and Features).
                iconUrl: "https://raw.githubusercontent.com/ndiing/my-app/refs/heads/master/images/icon.png",
                // The ICO file to use as the icon for the generated Setup.exe
                setupIcon: "images/icon.ico",
            },
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"],
        },
        {
            name: "@electron-forge/maker-deb",
            config: {
                icon: "images/icon.png",
            },
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {},
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-auto-unpack-natives",
            config: {},
        },
        {
            name: "@electron-forge/plugin-webpack",
            config: {
                mainConfig: "./webpack.main.config.js",
                renderer: {
                    config: "./webpack.renderer.config.js",
                    entryPoints: [
                        {
                            html: "./src/index.html",
                            js: "./src/renderer.js",
                            name: "main_window",
                            preload: {
                                js: "./src/preload.js",
                            },
                        },
                    ],
                },
            },
        },
        // Fuses are used to enable/disable various Electron functionality
        // at package time, before code signing the application
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
    ],
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "ndiing",
                    name: "my-app",
                },
                prerelease: false,
                draft: false,
            },
        },
    ],
};
