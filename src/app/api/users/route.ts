import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	try {
		const authUsers = await prisma.authUsers.findMany();
		return NextResponse.json(
			{ message: "Success", users: authUsers },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: Request) {
	const { email } = await req.json();

	try {
		await prisma.authUsers.delete({
			where: { email },
		});
		return NextResponse.json(
			{ message: "User deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}