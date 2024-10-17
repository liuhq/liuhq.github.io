import { allPosts, type Post } from '@/.content-collections/generated'
import splitByTag from '@/utils/splitByTag'
import Link from 'next/link'

interface Params {
    tag: string
}

export function generateStaticParams(): Array<Params> {
    const tags = splitByTag(allPosts).tags
    /* fix(nextjs problem when `output: export`):
        in dev, nextjs can encode uri
        but in build, nextjs will auto encode uri
    */
    return tags.map(tag => ({ tag: process.env.NODE_ENV == 'development' ? encodeURIComponent(tag) : tag }))
}

export default function Page({ params }: Readonly<{ params: Params }>) {
    const tags = splitByTag(allPosts)

    return (
        <div>
            <h2>标签：{params.tag}</h2>
            <h2>
                <Link href="/tags">返回</Link>
            </h2>
            <ul>
                {(tags[decodeURIComponent(params.tag)] as Array<Post>).map((post, i) => (
                    <li key={i}>
                        <Link href={{ pathname: `/post/${post._meta.path}` }}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
