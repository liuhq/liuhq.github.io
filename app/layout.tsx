import type { Metadata } from 'next'
import '@/styles/globals.css'
import Footer from '@/components/footer'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'My blog website.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    // Only dark, only dark...
    const isDark = true

    return (
        <html className={isDark ? 'ctp-mocha' : 'ctp-latte'}>
            {/* <html className="ctp-latte dark:ctp-mocha"> */}
            <body
                className="m-auto grid min-h-screen select-none grid-rows-[1fr_auto] place-items-center gap-8
                    overflow-x-hidden bg-ctp-base text-ctp-text md:w-[768px]"
            >
                {children}
                <Footer />
            </body>
        </html>
    )
}
