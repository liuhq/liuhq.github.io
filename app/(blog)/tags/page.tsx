import { allPosts } from '@/.content-collections/generated'
import TagList from '@/components/tagList'
import splitByTag from '@/utils/splitByTag'
import { RiPriceTag3Line } from '@remixicon/react'

export default function Page() {
    const postsByTag = splitByTag(allPosts)

    return (
        <main className="space-y-8">
            <header className="flex place-items-center gap-4 opacity-45">
                <RiPriceTag3Line className="mt-0.5 size-8 shrink-0" />
                <p className="text-4xl font-bold italic">{postsByTag.tags.length} 个标签</p>
            </header>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 md:px-12">
                {postsByTag.tags.map((tag, i) => (
                    <TagList key={i}  href={`/tags/${tag}`} check={false}>
                        <span>
                            {tag}
                            <span className="ml-2 inline-block rounded bg-ctp-surface0 px-1.5 text-sm">
                                {postsByTag[tag].length}
                            </span>
                        </span>
                    </TagList>
                ))}
            </ul>
        </main>
    )
}
