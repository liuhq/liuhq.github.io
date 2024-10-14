import { allPosts, type Post } from 'content-collections'

interface Params {
    slug: string
}

export function generateStaticParams(): Array<Params> {
    return allPosts.map(v => ({ slug: v._meta.path }))
}

export default function Page({ params }: Readonly<{ params: Params }>) {
    return <h2>Post {params.slug}</h2>
}
