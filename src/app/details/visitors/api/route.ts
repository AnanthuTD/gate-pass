import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const page = searchParams.get("page") || 1;
		const pageSize = searchParams.get("pageSize") || 10;

		const visitors = await prisma.visitors.findMany({
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize),
			orderBy: [
				{ arrivalTime: "desc" }, 
				{ departureTime: "desc" },
			],
		});

		const visitorsWithConvertedPhone = visitors.map((visitor) => ({
			...visitor,
			phone: visitor.phone ? visitor.phone.toString() : null,
		}));

		return NextResponse.json(visitorsWithConvertedPhone, {
			status: 200,
		});
	} catch (error) {
		console.error(error);

		return new NextResponse("Error fetching visitors", { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const id = searchParams.get('id');

		if (!id) {
			return new NextResponse("Visitor ID is required", { status: 400 });
		}

		await prisma.visitors.delete({
			where: { id: Number(id) },
		});

		return new NextResponse("Visitor deleted successfully", { status: 200 });
	} catch (error) {
		console.error(error);

		return new NextResponse("Error deleting visitor", { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
