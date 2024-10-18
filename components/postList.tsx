import type { Post } from '@/.content-collections/generated'
import Link from 'next/link'

export default function PostList({ posts }: Readonly<{ posts: Array<Post> }>) {
    return (
        <ul className="space-y-4 pt-2 md:space-y-1">
            {posts.map((post, i) => (
                <li key={i} className="flex place-content-between gap-1">
                    <Link
                        href={`/post/${post._meta.path}`}
                        className="line-clamp-1 transition-all hover:text-ctp-lavender md:hover:pl-4"
                        title={post.title}
                    >
                        {post.title}
                    </Link>
                    <span className="shrink-0 italic text-ctp-subtext0">{post.date}</span>
                </li>
            ))}
        </ul>
    )
}
