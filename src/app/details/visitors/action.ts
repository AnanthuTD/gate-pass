"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getVisitorCount() {
	try {
		const totalCount = await prisma.visitors.count();
		return totalCount;
	} catch (error) {
		console.error("Error counting visitors:", error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}
