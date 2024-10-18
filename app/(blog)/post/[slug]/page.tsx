import { allPosts } from 'content-collections'

interface Params {
    slug: string
}

export function generateStaticParams(): Array<Params> {
    return allPosts.map(v => ({
        /* fix(nextjs problem when `output: export`):
            in dev, nextjs can't encode uri
            but in build, nextjs will encode uri automatically
        */
        slug: process.env.NODE_ENV == 'development' ? encodeURIComponent(v._meta.path) : v._meta.path,
    }))
}

export default function Page({ params }: Readonly<{ params: Params }>) {
    return (
        <div>
            <h2>Post {decodeURIComponent(params.slug)}</h2>
        </div>
    )
}
