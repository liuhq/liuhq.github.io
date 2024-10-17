import { allPosts } from '@/.content-collections/generated'
import NavLink from '@/components/navLink'
import sortPostsByDate from '@/utils/sortPostsByDate'
import { getYear } from 'date-fns'
import Link from 'next/link'

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const sorted = sortPostsByDate(allPosts)
    const year = getYear(sorted[0].date)

    return (
        <div className="grid grid-rows-[auto_1fr] self-start justify-self-stretch px-4 md:w-[768px] md:px-0">
            <nav className="my-12 flex h-12 place-items-center justify-center gap-6 pr-1 md:justify-end">
                <NavLink href="/">主页</NavLink>
                <NavLink href={`/archive/${year}`}>归档</NavLink>
                <NavLink href="/tags">标签</NavLink>
            </nav>
            {children}
        </div>
    )
}
