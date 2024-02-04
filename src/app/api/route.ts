import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	const data: VisitorTicket | null = await request.json();

	if (data === null) {
		return NextResponse.json(
			{ message: "Request body is empty" },
			{ status: 400 }
		);
	}

	try {
		const visitor = await prisma.visitors.create({ data });

		return NextResponse.json(
			{
				message: "Visitor created successfully",
				visitor: { ...visitor, phone: visitor.phone.toString() },
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{ message: "Failed to create visitor" },
			{ status: 500 }
		);
	}
}
