import { allPosts, type Post } from '@/.content-collections/generated'
import Tag from '@/components/tag'
import getLatestPosts from '@/lib/getLatestPosts'
import { RiArrowRightDoubleFill, RiBilibiliFill, RiGithubFill } from '@remixicon/react'
import { getYear } from 'date-fns'
import ListLink from './ListLink'
import Link from 'next/link'

export default function Profile() {
    const prefLangs = ['JS/TS', 'Rust', 'C', 'C# in Unity', 'Racket']
    const prefDev = ['WEB', '独立游戏', '桌面应用']
    const latest = getLatestPosts(allPosts)

    return (
        <div className="flex flex-col gap-6">
            <ProfileCover />
            <ProfileInfo prefLangs={prefLangs} prefDev={prefDev} />
            <ProfileLatest posts={latest} />
        </div>
    )
}

const ProfileCover = () => {
    return <div>Cover</div>
}

const ProfileInfo = ({ prefLangs, prefDev }: Readonly<{ prefLangs: Array<string>; prefDev: Array<string> }>) => {
    return (
        <div className="space-y-1">
            <h2 className="text-3xl text-rosewater">
                漆予<span className="ml-2 text-xl italic leading-9 text-subtext0">Chiyuu</span>
            </h2>
            <div>
                偏好语言
                <ul className="ml-2 inline-flex gap-1">
                    {prefLangs.map((v, i) => (
                        <li key={i}>
                            <Tag>{v}</Tag>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                开发涉及
                <ul className="ml-2 inline-flex gap-1">
                    {prefDev.map((v, i) => (
                        <li key={i}>
                            <Tag>{v}</Tag>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center">
                联系？
                <ul className="ml-2 inline-flex gap-2 [&_svg]:block [&_svg]:size-5 hover:[&_svg]:text-rosewater">
                    <li>
                        <a href="https://github.com/liuhq" target="_blank">
                            <RiGithubFill />
                        </a>
                    </li>
                    <li>
                        <a href="https://space.bilibili.com/89553968" target="_blank">
                            <RiBilibiliFill />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const ProfileLatest = ({ posts }: Readonly<{ posts: ReadonlyArray<Post> }>) => {
    return (
        <div className="space-y-1 divide-y divide-solid divide-surface0">
            <header className="flex justify-between">
                <h2>最新笔记</h2>
                <Link
                    href={`/archive/${getYear(posts[0].date)}`}
                    className="flex items-center self-end text-sm italic hover:text-rosewater"
                >
                    查阅所有
                    <RiArrowRightDoubleFill className="size-5 italic" />
                </Link>
            </header>
            <ul>
                {posts.map((post, i) => (
                    <li key={i}>
                        <ListLink href={`/post/${encodeURIComponent(post._meta.path)}`}>{post.title}</ListLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}
