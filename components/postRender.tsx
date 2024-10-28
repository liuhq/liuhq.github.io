import { RiExternalLinkLine } from '@remixicon/react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export default function PostRender({ children }: Readonly<{ children: string }>) {
    return (
        <article
            className="prose max-w-none select-text pt-4 text-ctp-text dark:prose-invert selection:bg-ctp-lavender
                selection:text-ctp-crust prose-headings:text-ctp-text prose-h2:text-ctp-lavender
                prose-h3:text-ctp-subtext0 prose-h4:text-ctp-overlay1 prose-a:text-ctp-lavender prose-a:no-underline
                prose-blockquote:border-ctp-surface0 prose-blockquote:text-ctp-subtext0 prose-strong:font-bold
                prose-strong:text-ctp-teal prose-em:italic prose-em:text-ctp-sky prose-kbd:select-none prose-kbd:border
                prose-kbd:border-b-4 prose-kbd:border-ctp-surface2 prose-kbd:text-ctp-subtext1 prose-kbd:shadow-none
                prose-pre:rounded prose-pre:bg-ctp-crust prose-pre:text-ctp-text prose-th:text-ctp-lavender
                prose-img:mx-auto prose-img:rounded prose-img:shadow-md prose-img:shadow-ctp-crust
                prose-hr:border-ctp-surface2 hover:prose-a:underline hover:prose-kbd:border-ctp-lavender
                hover:prose-kbd:text-ctp-lavender prose-inline-code:rounded prose-inline-code:bg-ctp-surface0
                prose-inline-code:px-2 prose-inline-code:py-1 prose-inline-code:text-ctp-subtext1
                prose-inline-code:before:content-[''] prose-inline-code:after:content-[''] md:prose-hr:mx-12"
        >
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSlug]}
                components={{
                    details: ({ children }) => (
                        <details className="group select-text rounded-md border border-ctp-surface2 p-4 text-ctp-text">
                            {children}
                        </details>
                    ),
                    summary: ({ children }) => (
                        <summary className="select-none text-ctp-lavender group-open:mb-4">{children}</summary>
                    ),
                    a: ({ children, href }) => {
                        let inner = true
                        const pattern = /^[#/]/
                        if (href) inner = pattern.test(href)

                        return (
                            <a
                                href={href}
                                className="inline-flex place-items-center gap-0.5"
                                target={inner ? '_self' : '_blank'}
                            >
                                {children}
                                {inner || <RiExternalLinkLine className="size-[18px]" />}
                            </a>
                        )
                    },
                    del: ({ children }) => (
                        <del className="text-ctp-subtext0 decoration-ctp-red decoration-2">{children}</del>
                    ),
                    u: ({ children }) => (
                        <u className="decoration-ctp-peach decoration-2 underline-offset-2">{children}</u>
                    ),
                }}
            >
                {children}
            </Markdown>
        </article>
    )
}
