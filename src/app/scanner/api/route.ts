import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");
	try {
		const visitor = await prisma.visitors.findUnique({
			where: { id: Number(id) },
		});
		if (visitor) {

			const visitorWithConvertedPhone = {
				...visitor,
				phone: visitor.phone ? visitor.phone.toString() : null,
			};

			return NextResponse.json(visitorWithConvertedPhone, {
				status: 200,
			});
		} else {
			return new NextResponse("Visitor not found", {
				status: 404,
			});
		}
	} catch (error) {
		console.error(error);

		return new NextResponse("Error fetching visitor", { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

export async function PATCH(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");

	try {
		
		const updatedVisitor = await prisma.visitors.update({
			where: { id: Number(id) },
			data: {
				departureTime: new Date().toISOString(),
			},
		});

		if (updatedVisitor) {
			return new NextResponse("Departure time set successfully", {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
		} else {
			return new NextResponse("Visitor not found", {
				status: 404,
			});
		}
	} catch (error) {
		console.error("Error updating visitor:", error);
		return new NextResponse("Error updating visitor", {
			status: 500,
		});
	} finally {
		await prisma.$disconnect();
	}
}
