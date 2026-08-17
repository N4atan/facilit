import { prisma } from "@/lib/prisma";
import { Document } from "@prisma/client";
import { CategoryDocs } from "@prisma/client";

export type DocumentWithoutMd = Omit<Document, 'description'>

export async function createNewDocument(
	title: string,
	slug: string,
	category: CategoryDocs,
	markdown: string
) {
	return prisma.document.create({
		data: {
			title,
			slug,
			category,
			description: markdown,
		}
	})
}


export async function checkDocumentBySlug(slug: string): Promise<Boolean> {
	return await prisma.document.count({
		where: { slug }
	}) > 0;
}

export async function getAllDocumentsWithoutMd(): Promise<DocumentWithoutMd[]> {
	return await prisma.document.findMany({
		omit: {
			description: true,
		}
	})
}

export async function getDocumentsBySlug(slug: string): Promise<Document> {
	return await prisma.document.findUniqueOrThrow({
		where: { slug }
	})
}

