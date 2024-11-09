'use client'

import useRemark from '@/hooks/useRemark'
import { RiExternalLinkLine } from '@remixicon/react'
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export default function PostRender({ children }: Readonly<{ children: string }>) {
    const markdown = useRemark({
        source: children,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeRaw,
            rehypeSlug,
            [
                rehypeShiki,
                {
                    theme: 'catppuccin-mocha',
                } satisfies RehypeShikiOptions,
            ],
        ],
        remarkRehypeOptions: {
            allowDangerousHtml: true,
        },
        rehypeReactOptions: {
            components: {
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
                            className="relative inline place-items-center gap-0.5 break-all"
                            target={inner ? '_self' : '_blank'}
                        >
                            {children}
                            {inner || (
                                <RiExternalLinkLine className="relative bottom-0.5 ml-0.5 inline-block size-[18px]" />
                            )}
                        </a>
                    )
                },
                del: ({ children }) => (
                    <del className="text-ctp-subtext0 decoration-ctp-red decoration-2">{children}</del>
                ),
                u: ({ children }) => <u className="decoration-ctp-peach decoration-2 underline-offset-2">{children}</u>,
            },
        },
    })

    return (
        <article
            className="prose max-w-none select-text pt-4 text-ctp-text dark:prose-invert selection:bg-ctp-lavender
                selection:text-ctp-crust prose-headings:text-ctp-text prose-h2:mt-14 prose-h2:text-ctp-lavender
                prose-h3:mb-5 prose-h3:mt-12 prose-h3:text-ctp-subtext1 prose-h4:mb-4 prose-h4:mt-10 prose-h4:w-fit
                prose-h4:border-l-8 prose-h4:border-ctp-lavender prose-h4:bg-ctp-surface0 prose-h4:px-3 prose-h4:py-1
                prose-h4:text-ctp-subtext0 prose-a:text-ctp-lavender prose-a:no-underline
                prose-blockquote:border-ctp-surface0 prose-blockquote:not-italic prose-blockquote:text-ctp-overlay1
                prose-strong:font-bold prose-strong:text-ctp-teal prose-em:italic prose-em:text-ctp-sky
                prose-kbd:select-none prose-kbd:border prose-kbd:border-b-4 prose-kbd:border-ctp-surface2
                prose-kbd:text-ctp-subtext1 prose-kbd:shadow-none prose-pre:rounded prose-pre:border-4
                prose-pre:border-ctp-crust prose-pre:bg-ctp-crust prose-pre:text-ctp-text prose-pre:scrollbar-thin
                prose-pre:scrollbar-thumb-ctp-surface0 prose-th:text-ctp-lavender prose-img:mx-auto prose-img:rounded
                prose-img:shadow-md prose-img:shadow-ctp-crust prose-hr:border-ctp-surface2 hover:prose-a:underline
                hover:prose-kbd:border-ctp-lavender hover:prose-kbd:text-ctp-lavender
                hover:prose-pre:scrollbar-thumb-ctp-surface2 prose-inline-code:break-words prose-inline-code:rounded
                prose-inline-code:bg-ctp-surface0 prose-inline-code:px-2 prose-inline-code:py-1
                prose-inline-code:text-ctp-subtext1 prose-inline-code:before:content-['']
                prose-inline-code:after:content-[''] md:prose-hr:mx-12"
        >
            {markdown}
        </article>
    )
}
