export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },

	runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL || "http://localhost:3000",
		},
		private: {
			apiSecretToken: process.env.API_SECRET_TOKEN,
			apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
		},
		cloudinaryUrl: import.meta.env.CLOUDINARY_URL,
		cloudinaryCloudName: import.meta.env.CLOUDINARY_CLOUD_NAME,
		cloudinaryApiKey: import.meta.env.CLOUDINARY_API_KEY,
		cloudinaryApiSecret: import.meta.env.CLOUDINARY_API_SECRET,
	},
	supabase: {
		url: process.env.SUPABASE_URL,
		key: process.env.SUPABASE_KEY,
		serviceKey: process.env.SUPABASE_SERVICE_KEY,
		redirect: false,
	},
	css: ["@unocss/reset/tailwind.css"],
	modules: ["@unocss/nuxt", "nuxt-lucide-icons", "@nuxtjs/supabase"],
	routeRules: {
		"/": { prerender: true },
		"/api/**": {
			cors: true,
			headers: {
				"Access-Control-Allow-Origin": "http://localhost:3000",
				"Access-Control-Allow-Methods": "GET, POST, PATCH",
				"Access-Control-Allow-Headers":
					"Content-Type, Authorization, X-API-SECRET",
			},
		},
	},
});
