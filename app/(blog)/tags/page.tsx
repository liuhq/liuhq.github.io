import { allPosts } from '@/.content-collections/generated'
import Tag from '@/components/tag'
import splitByTag from '@/utils/splitByTag'
import { RiPriceTag3Line } from '@remixicon/react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '标签 | 漆予的笔记',
}

export default function Page() {
    const postsByTag = splitByTag(allPosts)

    return (
        <>
            <header className="flex place-items-center gap-4 text-ctp-lavender opacity-90">
                <RiPriceTag3Line className="mt-0.5 size-8 shrink-0" />
                <h2 className="text-4xl font-bold italic">{postsByTag.tags.length} 个标签</h2>
            </header>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {postsByTag.tags.map((tag, i) => (
                    <Tag key={i} href={`/tags/${tag}`}>
                        <span>
                            {tag}
                            <span className="ml-2 inline-block rounded bg-ctp-surface0 px-1.5 text-sm">
                                {postsByTag[tag].length}
                            </span>
                        </span>
                    </Tag>
                ))}
            </ul>
        </>
    )
}
