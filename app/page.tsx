import Tag from '@/components/tag'
import { RiArrowRightDoubleFill, RiBilibiliFill, RiGithubFill } from '@remixicon/react'

export default function Page() {
    return (
        <main className="grid place-content-center place-items-center gap-1 md:grid-cols-2">
            <Profile />
            <PinSomething />
        </main>
    )
}

const Profile = () => {
    const prefLangs = ['JS/TS', 'Rust', 'C', 'C# in Unity', 'Racket']
    const prefDev = ['WEB', '独立游戏', '桌面应用']

    return (
        <div className="flex flex-col gap-6">
            <div>Cover</div>
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
            <div className="space-y-1 divide-y divide-solid divide-surface0">
                <header className="flex justify-between">
                    <h2>最新笔记</h2>
                    <p className="group flex items-center self-end text-sm italic">
                        查阅所有
                        <RiArrowRightDoubleFill
                            className="md:group-hover:translate-x-1 size-5 italic md:transition-transform"
                        />
                    </p>
                </header>
                <ul>
                    <li>post 1</li>
                    <li>post 2</li>
                    <li>post 3</li>
                </ul>
            </div>
        </div>
    )
}

const PinSomething = () => {
    return (
        <div>
            <div>Pin Something</div>
            <ul>
                <li>Repo 1</li>
                <li>Repo 2</li>
                <li>Repo 3</li>
            </ul>
        </div>
    )
}
