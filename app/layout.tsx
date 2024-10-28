import { allData } from '@/.content-collections/generated'
import Footer from '@/components/footer'
import '@/styles/globals.css'
import { jetBrains_mono, rampart_one } from '@/utils/fonts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '漆予的营地 (o゜▽゜)o☆',
    description: '漆予的营地，分享一些好玩的内容',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const data = allData.find(data => data._meta.path == 'profile')!

    if (!data) {
        console.error("'profile' is not found")
    }

    return (
        <html
            lang={data.site_lang}
            className={`dark ctp-latte dark:ctp-mocha ${rampart_one.variable} ${jetBrains_mono.variable}`}
        >
            {/*
              * only use dark mode now
                <head>
                    <script src="/darkmode.js"></script>
                </head>
            */}
            <body
                className="m-auto grid min-h-screen select-none grid-rows-[auto_1fr_auto] place-items-center
                    overflow-x-hidden bg-ctp-base text-ctp-text scrollbar-thin scrollbar-thumb-ctp-surface0
                    hover:scrollbar-thumb-ctp-surface2 md:w-[768px]"
            >
                {children}
                <Footer />
            </body>
        </html>
    )
}
