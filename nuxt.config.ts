import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: { title: "Termportalen" },
  modules: ["@nuxtjs/tailwindcss"],
  buildModules: ["@nuxtjs/html-validator", "@unlighthouse/nuxt"],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  nitro: {
    preset: "vercel-edge",
  },
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
  htmlValidator: {
    usePrettier: true,
    logLevel: "verbose",
    failOnError: false,
  },
});
