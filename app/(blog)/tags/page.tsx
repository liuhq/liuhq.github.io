import { allPosts } from '@/.content-collections/generated'
import sortPostsByDate from '@/utils/sortPostsByDate'
import splitByTag from '@/utils/splitByTag'
import { getYear } from 'date-fns'
import Link from 'next/link'

export default function Page() {
    const year = getYear(sortPostsByDate(allPosts)[0].date)
    const tags = splitByTag(allPosts).tags

    return (
        <div>
            <Link href="/">主页</Link>
            <h2>
                <Link href={{ pathname: `/archive/${year}` }}>归档</Link>
            </h2>
            <h2>标签</h2>
            <ul>
                {tags.map((tag, i) => (
                    <li key={i}>
                        <Link href={{ pathname: `/tags/${tag}` }}>{tag}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
