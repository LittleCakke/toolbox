import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: [
        "nuxt-electron"
    ],
    pages: true,
    devServer: {
        port: 13579
    },
    vite: {
        plugins: [
            tailwindcss()
        ]
    },
    css: [
        "~/assets/global.css"
    ],
    routeRules: {
        "/": {
            redirect: "/home"
        }
    },
    electron: {
        build: [
            {
                entry: "electron/main.ts",
            },

            {
                entry: "electron/preload.ts",
                onstart(args)
                {
                    args.reload();
                }
            }
        ],

        renderer: {},

        disableDefaultOptions: true
    },
});