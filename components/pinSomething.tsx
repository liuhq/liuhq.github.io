import { allData } from '@/.content-collections/generated'
import { RiAwardLine, RiErrorWarningLine, RiGitForkLine, RiPushpin2Fill, RiStarLine } from '@remixicon/react'

interface GitHubApiType {
    full_name: string
    html_url: string
    description: string | null
    stargazers_count: number
    language: string
    forks_count: number
    open_issues_count: number
    license: {
        name: string | null
    }
}

export default async function PinSomething() {
    const pins = allData[0].pin
    const pinRes = []
    for (const pin of pins) {
        const res: GitHubApiType = await (await fetch(`https://api.github.com/repos/${pin.owner}/${pin.repo}`)).json()
        pinRes.push(res)
    }

    return (
        <div className="w-full space-y-4 md:p-2 md:pl-4">
            <h2 className="flex place-items-center text-lg">
                <RiPushpin2Fill className="mr-1 size-5" />
                一些东西
            </h2>
            <ul className="flex flex-col flex-wrap items-start gap-2">
                {pinRes.map((pin, i) => (
                    <li key={i} className="w-full space-y-2 rounded border border-ctp-surface2 px-2 py-1">
                        <a href={pin.html_url} target="_blank" className="hover:text-ctp-lavender">
                            {pin.full_name}
                        </a>
                        {pin.description && (
                            <p className="border-l-2 border-ctp-overlay0 pl-2 text-sm text-ctp-overlay1">
                                {pin.description}
                            </p>
                        )}
                        <footer className="flex justify-between text-sm text-ctp-subtext0">
                            <p className="flex space-x-2">
                                <span className="flex place-items-center gap-1">
                                    <RiStarLine className="size-4 text-ctp-subtext1" />
                                    {pin.stargazers_count}
                                </span>
                                <span className="flex place-items-center gap-1">
                                    <RiGitForkLine className="size-4 text-ctp-subtext1" />
                                    {pin.forks_count}
                                </span>
                                <span className="flex place-items-center gap-1">
                                    <RiErrorWarningLine className="size-4 text-ctp-subtext1" />
                                    {pin.open_issues_count}
                                </span>
                                {pin.license?.name && (
                                    <span className="flex place-items-center gap-1">
                                        <RiAwardLine className="size-4 text-ctp-subtext1" />
                                        {pin.license.name}
                                    </span>
                                )}
                            </p>
                            <span>{pin.language}</span>
                        </footer>
                    </li>
                ))}
            </ul>
        </div>
    )
}
