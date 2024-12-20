'use client'

import { allData, allPosts } from '@/.content-collections/generated'
import NavLink from '@/components/navLink'
import sortPostsByDate from '@/utils/sortPostsByDate'
import { getYear } from 'date-fns'
import { useSelectedLayoutSegments } from 'next/navigation'

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const sorted = sortPostsByDate(allPosts)
    const year = getYear(sorted[0].date)
    const segments = useSelectedLayoutSegments()
    const data = allData.find(data => data._meta.path == 'profile')!

    if (!data) {
        console.error("'profile' is not found")
    }

    return (
        <>
            <header
                className="mb-12 mt-6 flex flex-col place-items-center gap-4 justify-self-stretch md:mt-12 md:flex-row
                    md:justify-between"
            >
                <h1 className="justify-self-start font-special text-xl text-ctp-lavender">{data.header_title}</h1>
                <nav className="flex h-12 place-items-center gap-6 pr-1">
                    <NavLink href="/">主页</NavLink>
                    <NavLink href={`/archive/${year}`} active={segments[0] == 'archive'}>
                        归档
                    </NavLink>
                    <NavLink href="/tags" active={segments[0] == 'tags'}>
                        标签
                    </NavLink>
                    <NavLink href="/about" active={segments[0] == 'about'}>
                        关于
                    </NavLink>
                </nav>
            </header>
            <main className="max-w-[100vw] space-y-8 place-self-stretch px-4 md:max-w-[768px] md:px-0">{children}</main>
        </>
    )
}
