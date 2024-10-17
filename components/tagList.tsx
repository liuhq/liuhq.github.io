import Link from 'next/link'

export default function TagList({
    children,
    href,
    check,
}: Readonly<{ children: React.ReactNode; href: string; check: boolean }>) {
    return (
        <li className={check ? 'test-ctp-rosewater h-fit rounded bg-ctp-surface0' : 'h-fit'}>
            <Link
                href={{ pathname: href }}
                className="block border-ctp-surface0 px-2 py-0.5 text-center transition-colors md:hover:rounded
                    md:hover:bg-ctp-surface0"
            >
                {children}
            </Link>
        </li>
    )
}
