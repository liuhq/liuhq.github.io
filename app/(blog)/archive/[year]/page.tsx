import { allPosts, type Post } from '@/.content-collections/generated'
import PostList from '@/components/postList'
import Tag from '@/components/tag'
import sortPostsByDate from '@/utils/sortPostsByDate'
import type { SplitByMonthType } from '@/utils/splitByMonth'
import splitByMonth from '@/utils/splitByMonth'
import splitByYear from '@/utils/splitByYear'
import { RiCalendarLine } from '@remixicon/react'
import type { Metadata } from 'next'

interface Params {
    year: string
}

export const metadata: Metadata = {
    title: '归档 | 漆予的笔记',
}

export function generateStaticParams(): Array<Params> {
    const years = splitByYear(sortPostsByDate(allPosts)).years
    return years.map(year => ({ year: year.toString() }))
}

export default function Page({ params }: Readonly<{ params: Params }>) {
    const postsByYear = splitByYear(sortPostsByDate(allPosts))
    const postsByMonth = splitByMonth(sortPostsByDate(postsByYear[params.year] as Array<Post>, { asc: true }))

    return (
        <>
            <YearsTab years={postsByYear.years} active={params.year} />
            <MonthList posts={postsByMonth} />
        </>
    )
}

const YearsTab = ({ years, active }: Readonly<{ years: Array<string>; active: string }>) => (
    <header className="flex gap-4">
        <RiCalendarLine className="mt-0.5 size-6 shrink-0" />
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {years.map((year, i) => (
                <Tag key={i} href={`/archive/${year}`} check={active == year.toString()}>
                    {year} <span className="text-sm">年</span>
                </Tag>
            ))}
        </ul>
    </header>
)

const MonthList = ({ posts }: Readonly<{ posts: SplitByMonthType }>) => (
    <ul className="space-y-8">
        {posts.months.map((m, i) => (
            <li key={i}>
                <h2 className="mb-1 text-4xl font-bold italic text-ctp-lavender opacity-90">
                    {m}
                    <span className="text-lg"> 月</span>
                </h2>
                <PostList posts={posts[m] as Array<Post>} />
            </li>
        ))}
    </ul>
)
