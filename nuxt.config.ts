import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ['~/assets/styles/main.scss'],
    modules: [
        '@nuxt/content'
    ],
    content: {
        // https://content.nuxtjs.org/api/configuration
    }
})