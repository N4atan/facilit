// title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
"use server";
import { checkDocumentBySlug, createNewDocument, DocumentWithoutMd, getAllDocumentsWithoutMd, getDocumentsBySlug } from "@/services/document-service";
import { CategoryDocs, Document } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function handleCreateNewDocument(title: string, category: CategoryDocs, markdown: string) {
    try {
        const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        const isSlugTaken = await checkDocumentBySlug(slug);
        if (isSlugTaken) { throw new Error("Document slug is already taken"); }

        const docCreated = await createNewDocument(
            title, slug, category, markdown
        )

        revalidatePath("/docs/novo");
        return docCreated;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function handleFetchAllDocumentsWithoutMd(): Promise<DocumentWithoutMd[]> {
    try {
        return await getAllDocumentsWithoutMd();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function handleFetchDocumentBySlug(slug: string): Promise<Document | null> {
     try {
        return await getDocumentsBySlug(slug);
    } catch (error) {
        console.error(error);
        return null;
    }
}