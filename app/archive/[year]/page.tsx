import { allPosts, type Post } from '@/.content-collections/generated'
import splitByTag from '@/lib/splitByTag'
import splitByYear from '@/lib/splitByYear'
import Link from 'next/link'

interface Params {
    year: string
}

export function generateStaticParams(): Array<Params> {
    const years = splitByYear(allPosts).years
    return years.map(year => ({ year: year.toString() }))
}

export default function Page({ params }: Readonly<{ params: Params }>) {
    const archive = splitByYear(allPosts)

    return (
        <div>
            <Link href="/">主页</Link>
            <h2>归档</h2>
            <h2>
                <Link href="/tags">标签</Link>
            </h2>
            <YearsTab years={archive.years} active={params.year} />
            <PostList posts={archive[params.year] as Array<Post>} />
        </div>
    )
}

const YearsTab = ({ years, active }: Readonly<{ years: Array<string>; active: string }>) => (
    <div>
        <ul>
            {years.map((year, i) => (
                <li key={i} className={active == year.toString() ? 'text-red' : ''}>
                    <Link href={{ pathname: `/archive/${year}` }}>{year}</Link>
                </li>
            ))}
        </ul>
    </div>
)

const PostList = ({ posts }: Readonly<{ posts: Array<Post> }>) => (
    <div>
        <ul>
            {posts.map((post, i) => (
                <li key={i}>
                    <Link href={{ pathname: `/post/${encodeURIComponent(post._meta.path)}` }}>{post.title}</Link>
                </li>
            ))}
        </ul>
    </div>
)
