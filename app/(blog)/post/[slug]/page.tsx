import PostRender from '@/components/postRender'
import { RiPriceTag3Fill } from '@remixicon/react'
import { allPosts } from 'content-collections'
import { format, formatISO } from 'date-fns'
import type { Metadata } from 'next'
import Link from 'next/link'

interface Params {
    slug: string
}

export const metadata: Metadata = {
    title: '漆予的笔记 ψ(._. )>',
}

export function generateStaticParams(): Array<Params> {
    return allPosts.map(post => ({ slug: post.uuid }))
}

export default function Page({ params }: Readonly<{ params: Params }>) {
    const post = allPosts.find(post => post.uuid == params.slug)

    return post ? (
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
            <PostRender>{post.content}</PostRender>
            <footer className="text-center text-xl italic text-ctp-overlay1">--- 完 ---</footer>
        </>
    ) : (
        <p>{`内容遗失在世界的角落 (ノへ￣、)`}</p>
    )
}
