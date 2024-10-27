import { allAboutmes } from '@/.content-collections/generated'
import { RiExternalLinkLine } from '@remixicon/react'
import { format, formatISO } from 'date-fns'
import type { Metadata } from 'next'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export const metadata: Metadata = {
    title: '关于漆予 ♪(´▽｀)',
}

export default function Page() {
    const aboutme = allAboutmes[0]
    return (
        <main className="space-y-12">
            <header className="rounded-md bg-ctp-surface0 p-4 text-ctp-subtext1 shadow-md shadow-ctp-crust">
                <p className="text-lg font-bold">{aboutme.title}</p>
                <p>---</p>
                <p className="text-sm text-ctp-subtext0">
                    更新日期：
                    <time dateTime={formatISO(aboutme.date)}>{format(aboutme.date, 'yyyy 年 M 月 d 日')}</time>
                </p>
            </header>
            <article
                className="prose max-w-none text-ctp-text dark:prose-invert prose-headings:text-ctp-text
                    prose-h2:text-ctp-lavender prose-a:text-ctp-lavender prose-a:no-underline prose-strong:text-ctp-text
                    prose-hr:border-ctp-surface2 hover:prose-a:underline prose-inline-code:rounded
                    prose-inline-code:bg-ctp-surface0 prose-inline-code:px-2 prose-inline-code:py-1
                    prose-inline-code:text-ctp-subtext1 prose-inline-code:before:content-['']
                    prose-inline-code:after:content-[''] md:prose-hr:mx-12"
            >
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSlug]}
                    components={{
                        details: ({ children }) => (
                            <details
                                className="group select-text rounded-md border border-ctp-surface2 p-4 text-ctp-text"
                            >
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
                    }}
                >
                    {aboutme.content}
                </Markdown>
            </article>
        </main>
    )
}
