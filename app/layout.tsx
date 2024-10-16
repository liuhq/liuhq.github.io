import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'My blog website.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    // Only dark, only dark...
    const isDark = true

    return (
        <html className={isDark ? 'ctp-mocha' : 'ctp-latte'}>
            <body
                className="grid min-h-screen w-screen select-none place-items-center overflow-x-hidden bg-ctp-base
                    text-ctp-text md:grid-rows-[1fr_auto]"
            >
                {children}
                <footer className="h-12">Footer</footer>
            </body>
        </html>
    )
}
