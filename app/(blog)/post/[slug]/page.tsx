import { RiExternalLinkLine, RiPriceTag3Fill } from '@remixicon/react'
import { allPosts } from 'content-collections'
import { format, formatISO } from 'date-fns'
import type { Metadata } from 'next'
import Link from 'next/link'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

interface Params {
    slug: string
}

export const metadata: Metadata = {
    title: '漆予的笔记 ψ(._. )>',
}

export function generateStaticParams(): Array<Params> {
    return allPosts.map(v => ({
        /* fix(nextjs problem when `output: export`):
            in dev, nextjs can't encode uri
            but in build, nextjs will encode uri automatically
        */
        slug: process.env.NODE_ENV == 'development' ? encodeURIComponent(v._meta.path) : v._meta.path,
    }))
}

export default function Page({ params }: Readonly<{ params: Params }>) {
    const post = allPosts.find(post => post._meta.path == decodeURIComponent(params.slug))

    return (
        <main className="space-y-12">
            {post ? (
                <>
                    <header className="rounded-md bg-ctp-surface0 p-4 text-ctp-subtext1 shadow-md shadow-ctp-crust">
                        <p className="text-lg font-bold">{post.title}</p>
                        <p>---</p>
                        <p className="text-sm text-ctp-subtext0">
                            更新日期：
                            <time dateTime={formatISO(post.date)}>{format(post.date, 'yyyy 年 M 月 d 日')}</time>
                        </p>
                        <div className="mt-2 flex place-items-center gap-2 text-sm">
                            <RiPriceTag3Fill className="size-4 text-ctp-lavender" />
                            <ul className="flex gap-2">
                                {post.tags.map((tag, i) => (
                                    <li key={i}>
                                        <Link
                                            href={{ pathname: `/tags/${tag}` }}
                                            className="block px-2 py-0.5 text-center transition-colors md:hover:rounded
                                                md:hover:bg-ctp-surface1"
                                        >
                                            {tag}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </header>
                    <article
                        className="prose max-w-none select-text text-ctp-text dark:prose-invert
                            selection:bg-ctp-lavender selection:text-ctp-crust prose-headings:text-ctp-text
                            prose-h2:text-ctp-lavender prose-h3:text-ctp-subtext0 prose-h4:text-ctp-overlay1
                            prose-a:text-ctp-lavender prose-a:no-underline prose-blockquote:border-ctp-surface0
                            prose-blockquote:text-ctp-subtext0 prose-strong:text-ctp-text prose-kbd:select-none
                            prose-kbd:border prose-kbd:border-b-4 prose-kbd:border-ctp-surface2
                            prose-kbd:text-ctp-subtext1 prose-kbd:shadow-none prose-pre:rounded prose-pre:bg-ctp-crust
                            prose-pre:text-ctp-text prose-th:text-ctp-lavender prose-img:mx-auto prose-img:rounded
                            prose-img:shadow-md prose-img:shadow-ctp-crust prose-hr:border-ctp-surface2
                            hover:prose-a:underline hover:prose-kbd:border-ctp-lavender
                            hover:prose-kbd:text-ctp-lavender prose-inline-code:rounded
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
                                        className="group select-text rounded-md border border-ctp-surface2 p-4
                                            text-ctp-text"
                                    >
                                        {children}
                                    </details>
                                ),
                                summary: ({ children }) => (
                                    <summary className="select-none text-ctp-lavender group-open:mb-4">
                                        {children}
                                    </summary>
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
                            {post.content}
                        </Markdown>
                    </article>
                    <footer className="text-center text-xl italic text-ctp-overlay1">--- 完 ---</footer>
                </>
            ) : (
                <p>{`内容遗失在世界的角落 (ノへ￣、)`}</p>
            )}
        </main>
    )
}
