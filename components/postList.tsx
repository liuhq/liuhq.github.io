import type { Post } from '@/.content-collections/generated'
import Link from 'next/link'

export default function PostList({ posts }: Readonly<{ posts: Array<Post> }>) {
    return (
        <ul className="space-y-4 md:space-y-1 pt-2">
            {posts.map((post, i) => (
                <li key={i} className="flex place-content-between">
                    <Link
                        href={`/post/${post._meta.path}`}
                        className="hyphens-auto transition-all md:hover:pl-4 hover:text-ctp-rosewater"
                    >
                        {post.title}
                    </Link>
                    <span className="shrink-0 italic text-ctp-subtext0">{post.date}</span>
                </li>
            ))}
        </ul>
    )
}
