import { RiArrowRightDoubleFill } from '@remixicon/react'
import Link from 'next/link'

export default function ListBoard({
    children,
    title,
    toMore = false,
}: Readonly<{ children: React.ReactNode; title: React.ReactNode; toMore?: { name: string; url: string } | false }>) {
    return (
        <div className="space-y-2">
            <header className="flex place-content-between border-b border-ctp-surface0 pb-1">
                <h2 className="flex place-items-center text-lg">{title}</h2>
                {toMore && (
                    <Link
                        href={{ pathname: toMore.url }}
                        className="group flex items-center self-end text-sm italic hover:text-ctp-lavender"
                    >
                        {toMore.name}
                        <RiArrowRightDoubleFill
                            className="size-5 italic transition-transform md:group-hover:translate-x-1"
                        />
                    </Link>
                )}
            </header>
            {children}
        </div>
    )
}
