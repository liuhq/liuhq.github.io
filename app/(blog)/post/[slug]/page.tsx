import { allPosts } from 'content-collections'
import Link from 'next/link'

interface Params {
    slug: string
}

export function generateStaticParams(): Array<Params> {
    return allPosts.map(v => ({ slug: v._meta.path }))
}

export default function Page({ params }: Readonly<{ params: Params }>) {
    return (
        <div>
            <Link href="/" className="hover:text-ctp-rosewater">
                主页
            </Link>
            <h2>Post {decodeURIComponent(params.slug)}</h2>
        </div>
    )
}
