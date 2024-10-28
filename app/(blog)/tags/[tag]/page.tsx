import { allPosts, type Post } from '@/.content-collections/generated'
import PostList from '@/components/postList'
import splitByTag from '@/utils/splitByTag'
import { RiPriceTag3Line } from '@remixicon/react'
import type { Metadata } from 'next'

interface Params {
    tag: string
}

export const metadata: Metadata = {
    title: '标签 | 漆予的笔记',
}

export function generateStaticParams(): Array<Params> {
    const tags = splitByTag(allPosts).tags
    /* fix(nextjs problem when `output: export`):
        in dev, nextjs can't encode uri
        but in build, nextjs will encode uri automatically
    */
    return tags.map(tag => ({ tag: process.env.NODE_ENV == 'development' ? encodeURIComponent(tag) : tag }))
}

export default function Page({ params }: Readonly<{ params: Params }>) {
    const tags = splitByTag(allPosts)

    return (
        <>
            <header className="flex place-items-center gap-4 text-ctp-lavender opacity-90">
                <RiPriceTag3Line className="mt-0.5 size-8 shrink-0" />
                <h2 className="text-4xl font-bold italic">标签：{decodeURIComponent(params.tag)}</h2>
            </header>
            <PostList posts={tags[decodeURIComponent(params.tag)] as Array<Post>} />
        </>
    )
}
