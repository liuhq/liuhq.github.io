import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'My blog website.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html>
            <body>{children}</body>
        </html>
    )
}
