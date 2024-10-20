import { allData } from '@/.content-collections/generated'
import { RiCopyrightLine } from '@remixicon/react'
import { constructNow, getYear } from 'date-fns'
import { headers } from 'next/headers'

export default function Footer() {
    const profile = allData.find(data => data._meta.path == 'profile')!

    if (!profile) {
        console.error("'profile' is not found")
    }

    return (
        <footer className="h-14 text-sm text-ctp-subtext0 md:flex md:place-items-center md:gap-2">
            <p className="flex place-content-center place-items-center">
                <RiCopyrightLine className="inline-block size-4" />
                &nbsp;
                {`2022 - ${getYear(constructNow(new Date()))}`}&nbsp;&nbsp;
                <RefLink href={profile.home_url}>{profile.author.full_name}</RefLink>
            </p>
            <p className="hidden md:block">&nbsp;&nbsp;|&nbsp;&nbsp;</p>
            <p>
                Powered by <RefLink href="https://nextjs.org/">Next.js</RefLink>&nbsp;+&nbsp;
                <RefLink href="https://tailwindcss.com/">Tailwind CSS</RefLink>&nbsp;+&nbsp;
                <RefLink href="https://tailwindcss.catppuccin.com/">Catppuccin</RefLink>
            </p>
        </footer>
    )
}

const RefLink = ({ children, href }: Readonly<{ children: React.ReactNode; href: string }>) => (
    <a href={href} target="_blank" className="cursor-pointer">
        {children}
    </a>
)
