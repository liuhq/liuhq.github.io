import type { Post } from '@/.content-collections/generated'
import Link from 'next/link'

export default function PostList({
    posts,
    sortByUpdate = false,
}: Readonly<{ posts: Array<Post>; sortByUpdate?: boolean }>) {
    return (
        <ul className="space-y-4 md:space-y-1">
            {posts.map(post => (
                <li key={post.uuid} className="flex place-content-between gap-1">
                    <Link
                        href={`/post/${post.uuid}`}
                        className="group relative flex place-items-center hover:text-ctp-lavender"
                        title={post.title}
                    >
                        <span
                            className="hidden md:absolute md:-left-4 md:inline-block md:h-4 md:border-x-2
                                md:border-ctp-lavender md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
                        ></span>
                        {post.title}
                    </Link>
                    <span className="shrink-0 italic text-ctp-subtext0">
                        {sortByUpdate ? post.update || post.date : post.date}
                    </span>
                </li>
            ))}
        </ul>
    )
}
