import { allPosts, type Post } from '@/.content-collections/generated'
import PostList from '@/components/postList'
import type { SplitByMonthType } from '@/utils/splitByMonth'
import splitByMonth from '@/utils/splitByMonth'
import splitByYear from '@/utils/splitByYear'
import { RiCalendarLine } from '@remixicon/react'
import Link from 'next/link'

interface Params {
    year: string
}

export function generateStaticParams(): Array<Params> {
    const years = splitByYear(allPosts).years
    return years.map(year => ({ year: year.toString() }))
}

export default function Page({ params }: Readonly<{ params: Params }>) {
    const postsByYear = splitByYear(allPosts)
    const postsByMonth = splitByMonth(postsByYear[params.year] as Array<Post>)

    return (
        <main className="space-y-8">
            <YearsTab years={postsByYear.years} active={params.year} />
            <MonthList posts={postsByMonth} />
        </main>
    )
}

const YearsTab = ({ years, active }: Readonly<{ years: Array<string>; active: string }>) => (
    <header className="flex gap-4">
        <RiCalendarLine className="mt-0.5 size-6 shrink-0" />
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {years.map((year, i) => (
                <li
                    key={i}
                    className={active == year.toString() ? 'test-ctp-rosewater h-fit rounded bg-ctp-surface0' : 'h-fit'}
                >
                    <Link
                        href={{ pathname: `/archive/${year}` }}
                        className="block border-ctp-surface0 px-2 py-0.5 text-center hover:rounded hover:bg-ctp-surface0"
                    >
                        {year}
                    </Link>
                </li>
            ))}
        </ul>
    </header>
)

const MonthList = ({ posts }: Readonly<{ posts: SplitByMonthType }>) => (
    <ul className="space-y-8">
        {posts.months.map((m, i) => (
            <li key={i}>
                <h2 className="text-4xl font-bold italic opacity-45">
                    {m}
                    <span className="text-lg"> 月</span>
                </h2>
                <PostList posts={posts[m] as Array<Post>} />
            </li>
        ))}
    </ul>
)
