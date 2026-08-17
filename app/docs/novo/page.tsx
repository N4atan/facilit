"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import { useTheme } from "next-themes";
import { CheckCheck, Eraser, File } from "lucide-react";
import SimpleMde from "@/components/Editor/SimpleMde";
import { CategoryDocs } from "@prisma/client";
import { handleCreateNewDocument } from "@/actions/document-action";
import { showCodeToast } from "@/components/ui/ToastCode";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";


// Importação dinâmica desligando o Server-Side Rendering
const SimpleMdeReact = dynamic(
	() => import('react-simplemde-editor'),
	{ ssr: false }
);





export default function Home() {
	const [title, setTitle] = useState<string>('');
	const [category, setCategory] = useState<CategoryDocs | null>(null);
	const [markdown, setMarkdown] = useState<string>('');

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			setIsLoading(true);

			const response = await handleCreateNewDocument(title, (category as CategoryDocs), markdown);

			toast.success("Documento Adicionado!");

		} catch (e: any) {
			showCodeToast("Erro ao adicionar o documento.", e.message, 'error');
		} finally {
			setIsLoading(false);
		}
	}

	const handleMarkdownChange = useCallback((value: string) => {
		setMarkdown(value);
	}, []);


	return (
		<section className="flex flex-col w-full h-full gap-2">
			<div className="breadcrumbs text-sm h-15">
				<ul>
					<li><a>Edição</a></li>
					<li><a>Nova Página</a></li>

				</ul>
			</div>

			<h1 className="text-3xl font-extrabold text-content">Adicionar à Documentação</h1>
			<p className="text-md text-base-content/70">Preencha os campos abaixo para criar uma nova página na documentação.</p>

			<div className="divider w-full"></div>

			<form onSubmit={onSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4">

					<fieldset className="fieldset">
						<legend className="fieldset-legend">Título do Artigo</legend>
						<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full" placeholder="Ex: Reset de Senha de Conta Corporativa" />
					</fieldset>

					<fieldset className="fieldset">
						<legend className="fieldset-legend">Categoria</legend>
						<select defaultValue="Selecione a Categoria" className="select" onChange={(e) => setCategory(e.target.value as CategoryDocs)}>
							<option disabled={true}>Selecione a Categoria</option>
							{Object.values(CategoryDocs).map((category) => (
								<option key={category} value={category}>{category}</option>
							))}
						</select>
					</fieldset>
				</div>


				<fieldset className="fieldset">
					<legend className="fieldset-legend">Sinta-se à vontade para escrever</legend>


					<SimpleMde value={markdown} onChange={handleMarkdownChange} />
				</fieldset>



				<div className="flex flex-row justify-end gap-6">
					<button className="btn btn-ghost btn-soft gap-4" type="reset">
						<Eraser size={20} />
						Limpar Campos
					</button>

					<button className="btn btn-primary gap-4" type="submit">
						<CheckCheck size={20} />
						Salvar Página
					</button>

					
				</div>
			</form>
		</section>
	);
}
