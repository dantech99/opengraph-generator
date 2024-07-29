// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: false },

    runtimeConfig: {
        openaiApiKey: process.env.OPENAI_API_KEY,
    },
    css: ["@unocss/reset/tailwind.css"],
    modules: ["@unocss/nuxt", "nuxt-lucide-icons"]
});