import { serverSupabaseServiceRole } from "#supabase/server";
const config = useRuntimeConfig();

interface Database {
	public: {
		urls: Url;
	};
}

type Url = {
	id: number;
	original_url: string;
	short_url: string;
	is_anonymous: boolean;
	created_at?: string;
};

export default defineEventHandler(async (event) => {
	const method = event.node.req.method;

	if (method === "POST") {
		const body = await readBody(event);
		let { originalUrl, isAnonymous } = body;

		if (!originalUrl) {
			return {
				status: 400,
				body: {
					error: "originalUrl is required",
				},
			};
		}

		// Normalize the URL
		if (
			!originalUrl.startsWith("http://") &&
			!originalUrl.startsWith("https://")
		) {
			originalUrl = `https://${originalUrl}`;
		}

		// Remove trailing slash
		if (originalUrl.endsWith("/")) {
			originalUrl = originalUrl.slice(0, -1);
		}

		const supabase = serverSupabaseServiceRole<Database>(event);

		if (!supabase) {
			console.error("Supabase client not initialized");
			return {
				status: 500,
				body: {
					error: "Supabase client not initialized",
				},
			};
		}

		const { data: existingUrl, error: fetchError } = await supabase
			.from("urls")
			.select("*")
			.eq("original_url", originalUrl)
			.single();

		if (fetchError && fetchError.code !== "PGRST116") {
			console.error("Error fetching data from Supabase:", fetchError);
			return {
				status: 500,
				body: {
					error: "Failed to fetch URL data",
					details: fetchError.message,
				},
			};
		}

		if (existingUrl) {
			const baseUrl =
				process.env.NODE_ENV === "development"
					? "http://localhost:3000"
					: config.baseUrl;

			return {
				statusCode: 200,
				body: {
					shortUrl: `${baseUrl}/${existingUrl.short_url}`,
					originalUrl,
				},
			};
		}

		const shortUrl = Math.random().toString(36).substring(2, 8);

		const urlData: Url = {
			id: Date.now(),
			original_url: originalUrl,
			short_url: shortUrl,
			is_anonymous: isAnonymous ?? true,
			created_at: new Date().toISOString(),
		};

		const { data, error } = await supabase
			.from("urls")
			.insert([urlData])
			.select();

		if (error) {
			console.error("Error inserting data into Supabase:", error);
			return {
				status: 500,
				body: {
					error: "Failed to create short url",
					details: error.message,
				},
			};
		}

		const baseUrl =
			process.env.NODE_ENV === "development"
				? "http://localhost:3000"
				: config.baseUrl;

		return {
			statusCode: 200,
			body: {
				shortUrl: `${baseUrl}/${shortUrl}`,
				originalUrl,
			},
		};
	} else if (method === "GET") {
		const { shortUrl, originalUrl } = getQuery(event);

		if (!shortUrl && !originalUrl) {
			return {
				status: 400,
				body: {
					error: "shortUrl or originalUrl is required",
				},
			};
		}

		let normalizedUrl = originalUrl;
		if (typeof normalizedUrl === "string" && normalizedUrl.endsWith("/")) {
			normalizedUrl = normalizedUrl.slice(0, -1);
		}

		const supabase = serverSupabaseServiceRole<Database>(event);

		if (!supabase) {
			console.error("Supabase client not initialized");
			return {
				status: 500,
				body: {
					error: "Supabase client not initialized",
				},
			};
		}

		let query = supabase.from("urls").select("*").single();

		if (shortUrl) {
			query = query.eq("short_url", shortUrl);
		} else if (normalizedUrl) {
			query = query.eq("original_url", normalizedUrl);
		}

		const { data: existingUrl, error: fetchError } = await query;

		if (fetchError && fetchError.code !== "PGRST116") {
			console.error("Error fetching data from Supabase:", fetchError);
			return {
				status: 500,
				body: {
					error: "Failed to fetch URL data",
					details: fetchError.message,
				},
			};
		}

		if (existingUrl) {
			return {
				statusCode: 200,
				body: existingUrl,
			};
		} else {
			return {
				statusCode: 404,
				body: {
					error: "URL not found",
				},
			};
		}
	} else {
		return {
			statusCode: 405,
			body: {
				error: "HTTP method is not allowed.",
			},
		};
	}
});
