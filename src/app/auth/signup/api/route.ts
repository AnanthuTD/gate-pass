import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	const { name, email, password } : User = await req.json();

	try {
		const existingUser = await prisma.authUsers.findUnique({
			where: { email },
		});
		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 }
			);
		}

		const newUser = await prisma.authUsers.create({
			data: {
				name,
				email,
				password,
			},
		});

		console.log('====================================');
		console.log('New user added');
		console.log('====================================');

		return NextResponse.json(
			{ message: "User created successfully", user: newUser },
			{ status: 201, statusText:'ok' }
		);
	} catch (error) {
		console.error("Error creating user:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
