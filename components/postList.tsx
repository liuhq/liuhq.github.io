import type { Post } from '@/.content-collections/generated'
import Link from 'next/link'

export default function PostList({ posts }: Readonly<{ posts: Array<Post> }>) {
    return (
        <div>
            <ul className="space-y-1 pt-2">
                {posts.map((post, i) => (
                    <li key={i} className="flex place-content-between">
                        <Link href={`/post/${post._meta.path}`} className="hover:text-ctp-rosewater">
                            {post.title}
                        </Link>
                        <span className="italic text-ctp-subtext0">{post.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
