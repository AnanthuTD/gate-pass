import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
	name: string;
	email: string;
	password: string;
}

async function getUser(email: string, password: string): Promise<User | null> {
	try {
		const user: User | null = await prisma.authUsers.findUnique({
			where: {
				email,
				password,
			},
		});
		return user;
	} catch (error) {
		console.error("Failed to fetch user:", error);
		throw new Error("Failed to fetch user.");
	}
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	secret: `${process.env.AUTH_SECRET}`,
	providers: [
		Credentials({
			async authorize(credentials: User) {
				const { email, password } = credentials;
				const user = await getUser(email, password);
				if (!user) return null;
				const passwordsMatch = password === user.password;

				if (passwordsMatch) return user;

				console.log("Invalid credentials");
				return null;
			},
		}),
	],
});
