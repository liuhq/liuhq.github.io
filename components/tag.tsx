import Link from 'next/link'

export default function Tag({
    children,
    href,
    check = false,
    outer = false,
}: Readonly<{ children: React.ReactNode; href: string; check?: boolean; outer?: boolean }>) {
    return (
        <li className={check ? 'h-fit rounded bg-ctp-surface0 text-ctp-lavender' : 'h-fit'}>
            <Link
                href={{ pathname: href }}
                target={outer ? '_blank' : '_self'}
                className="block px-2 py-0.5 text-center transition-colors md:hover:rounded md:hover:bg-ctp-surface0"
            >
                {children}
            </Link>
        </li>
    )
}
