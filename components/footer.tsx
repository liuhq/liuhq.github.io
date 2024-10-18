import { allData } from '@/.content-collections/generated'
import { RiCopyrightLine } from '@remixicon/react'
import { constructNow, getYear } from 'date-fns'

export default function Footer() {
    const profile = allData.find(data => data._meta.path == 'profile')

    return (
        <footer className="h-14 text-sm text-ctp-subtext0 md:flex md:place-items-center md:gap-2">
            <p className="flex place-content-center place-items-center">
                <RiCopyrightLine className="inline-block size-4" />
                &nbsp;
                {`2022 - ${getYear(constructNow(new Date()))}`}&nbsp;&nbsp;|&nbsp;&nbsp;
                <RefLink href={profile ? profile.home_url : '/'}>漆予 Chiyuu</RefLink>
            </p>
            <p className="hidden md:block">-</p>
            <p>
                Based on <RefLink href="https://nextjs.org/">Next.js</RefLink>&nbsp;+&nbsp;
                <RefLink href="https://tailwindcss.com/">Tailwind CSS</RefLink>&nbsp;+&nbsp;
                <RefLink href="https://tailwindcss.catppuccin.com/">Catppuccin</RefLink>
            </p>
        </footer>
    )
}

const RefLink = ({ children, href }: Readonly<{ children: React.ReactNode; href: string }>) => (
    <a href={href} target="_blank" className="text-ctp-lavender">
        {children}
    </a>
)
