
"use client"

import { handleFetchDocumentBySlug } from "@/actions/document-action";
import { CategoryDocs, Document } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DocumentHeader from "@/components/docs/DocumentHeader";
import DocumentContent from "@/components/docs/DocumentContent";



export default function Home() {

	return (
		<section className="flex flex-col w-full h-full gap-2">
			<DocumentHeader
				category={"Comece Por Aqui"}
				title={"Introdução à Wiki"}
				lastUpdated={null}
			/>

			<DocumentContent description={
				"# Bem-vindo à Bíblia dos Facilitadores\n\nEsta é a documentação oficial da equipe de TI e Administração. Criamos este espaço para centralizar todos os nossos processos, configurações e guias de resolução de problemas.\n\n## Como usar este guia?\n-----\nUtilize o menu lateral para navegar entre as categorias. Você encontrará desde tutoriais de infraestrutura até guias de como lidar com sistemas externos.\n\n## Colabore!\n-----\nEsta wiki é viva. Se você descobrir uma solução nova ou notar que um processo mudou, clique no botão **Novo Artigo** e documente. O conhecimento compartilhado é o que faz nossa equipe forte."
			} />
		</section>
	);
}
