import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


export const RenderMarkdown = ({ content }: { content: string }) => (
	<article className="prose max-w-none w-full mx-0">
		<Markdown
			remarkPlugins={[remarkGfm]}
			components={{
				a: ({ node, ...props }) => (
					<a {...props} target='_blank' className='link' />
				),
				img: ({ node, ...props }) => (
					<img {...props} className="rounded-lg shadow-sm border border-base-300" />
				),
				hr: ({ node, ...props }) => (
					<div {...props} className="divider" />
				)
			}}
		>
			{content}
		</Markdown>
	</article>
)