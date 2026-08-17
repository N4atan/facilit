
"use client"

import { handleFetchDocumentBySlug } from "@/actions/document-action";
import { Document } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DocumentHeader from "@/components/docs/DocumentHeader";
import DocumentContent from "@/components/docs/DocumentContent";

export default function Home() {
	
	const { slug } = useParams();

	const [document, setDocument] = useState<Document | null>(null);

	useEffect(() => {
		if (!slug) return;
		const loadData = async () => {
			setDocument(await handleFetchDocumentBySlug(slug as string));
		};
		loadData();
	}, [slug]);

	return (
		<section className="flex flex-col w-full h-full gap-2">
			<DocumentHeader
				category={document?.category ?? null}
				title={document?.title ?? "Não foi possível localizar..."}
				lastUpdated={document?.lastUpdated ?? null}
			/>

			<DocumentContent description={document?.description ?? null} />
		</section>
	);
}
