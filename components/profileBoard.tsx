import { allData, type Datum } from '@/.content-collections/generated'
import { RiBilibiliFill, RiGithubFill, RiGitRepositoryFill } from '@remixicon/react'
import Link from 'next/link'
import ListBoard from './listBoard'
import Tag from './tag'

export default function ProfileBoard() {
    const profile = allData.find(data => data._meta.path == 'profile')!

    if (!profile) {
        console.error("'profile' is not found")
    }

    return (
        <div className="flex flex-col gap-6">
            <ProfileInfo cn_name={profile.author.cn_name} en_name={profile.author.en_name} prefs={profile.prefList} />
            <RepoList repos={profile.repo} />
        </div>
    )
}

const ProfileInfo = ({
    cn_name,
    en_name,
    prefs,
}: Readonly<{ cn_name: string; en_name: string; prefs: Array<{ name: string; items: Array<string> }> }>) => (
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
                            <div className="rounded bg-ctp-surface0 px-1 text-sm text-ctp-subtext1">{v}</div>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
        <div className="pt-4">
            <ul className="flex place-items-center gap-2 [&_svg]:block [&_svg]:size-5 hover:[&_svg]:text-ctp-lavender">
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

const RepoList = ({ repos }: Readonly<{ repos: Datum['repo'] }>) => (
    <ListBoard
        title={
            <>
                <RiGitRepositoryFill className="mr-1 size-5" />
                一些仓库
            </>
        }
    >
        <ul className="flex flex-wrap gap-2 pt-2">
            {repos.map((repo, i) => (
                <Tag key={i} href={`https://github.com/${repo.owner}/${repo.repo}`} outer>
                    <span>
                        {repo.repo}
                        <span className="ml-2 inline-block rounded bg-ctp-surface0 px-1.5 text-sm">{repo.owner}</span>
                    </span>
                </Tag>
            ))}
        </ul>
    </ListBoard>
)
