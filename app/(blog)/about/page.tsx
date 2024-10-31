import { allAboutmes } from '@/.content-collections/generated'
import PostRender from '@/components/postRender'
import { format, formatISO } from 'date-fns'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '关于漆予 ♪(´▽｀)',
}

export default function Page() {
    const aboutme = allAboutmes[0]
    return (
        <>
            <header className="rounded-md bg-ctp-surface0 p-4 text-ctp-subtext1 shadow-md shadow-ctp-crust">
                <p className="text-lg font-bold">{aboutme.title}</p>
                <p>---</p>
                <p className="text-sm text-ctp-subtext0">
                    更新日期：
                    <time dateTime={formatISO(aboutme.update)}>{format(aboutme.update, 'yyyy 年 M 月 d 日')}</time>
                </p>
            </header>
            <PostRender>{aboutme.content}</PostRender>
        </>
    )
}
