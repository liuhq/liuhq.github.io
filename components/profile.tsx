import { allData, allPosts, type Post } from '@/.content-collections/generated'
import Tag from '@/components/tag'
import getLatestPosts from '@/utils/getLatestPosts'
import { RiArrowRightDoubleFill, RiBilibiliFill, RiGithubFill, RiQuillPenFill } from '@remixicon/react'
import { getYear } from 'date-fns'
import Link from 'next/link'
import PostList from './postList'

export default function Profile() {
    const latest = getLatestPosts(allPosts)
    const profile = allData.find(data => data._meta.path == 'profile')!

    if (!profile) {
        console.error("'profile' is not found")
    }

    return (
        <div className="flex flex-col gap-6">
            <ProfileInfo cn_name={profile.author.cn_name} en_name={profile.author.en_name} prefs={profile.prefList} />
            <ProfileLatest posts={latest} />
        </div>
    )
}

const ProfileInfo = ({
    cn_name,
    en_name,
    prefs,
}: Readonly<{ cn_name: string; en_name: string; prefs: Array<{ name: string; items: Array<string> }> }>) => {
    return (
        <div className="space-y-1">
            <h1 className="text-3xl text-ctp-lavender">
                {cn_name}
                <span className="ml-2 text-xl italic leading-9 text-ctp-subtext0">{en_name}</span>
            </h1>
            {prefs.map((pref, i) => (
                <div key={i}>
                    {pref.name}
                    <ul className="ml-2 inline-flex gap-1">
                        {pref.items.map((v, i) => (
                            <li key={i}>
                                <Tag>{v}</Tag>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <div className="pt-4">
                <ul
                    className="flex place-items-center gap-2 [&_svg]:block [&_svg]:size-5
                        hover:[&_svg]:text-ctp-lavender"
                >
                    <li>
                        <Link href="/about" className="text-sm italic text-ctp-subtext0 hover:text-ctp-lavender">
                            更多关于？
                        </Link>
                    </li>
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

const ProfileLatest = ({ posts }: Readonly<{ posts: Array<Post> }>) => {
    return (
        <div className="space-y-2 divide-y divide-solid divide-ctp-surface0">
            <header className="flex place-content-between">
                <h2 className="flex place-items-center text-lg">
                    <RiQuillPenFill className="mr-1 size-5" />
                    最新笔记
                </h2>
                <Link
                    href={`/archive/${getYear(posts[0].date)}`}
                    className="group flex items-center self-end text-sm italic hover:text-ctp-lavender"
                >
                    查阅所有
                    <RiArrowRightDoubleFill className="size-5 italic transition-transform md:group-hover:translate-x-1" />
                </Link>
            </header>
            <div className="md:-ml-5">
                <PostList posts={posts} />
            </div>
        </div>
    )
}
