import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;

			if (isLoggedIn) {
				return true;
			}

			return false;
		},
		redirect: async ({ url, baseUrl }) => {
			const params = new URLSearchParams(new URL(url).search);
			const callbackUrl = params.get("callbackUrl") || baseUrl;

			return url.startsWith(baseUrl)
				? Promise.resolve(callbackUrl)
				: Promise.resolve(baseUrl);
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
