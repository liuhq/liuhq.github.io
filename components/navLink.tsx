import Link from 'next/link'

export default function NavLink({
    children,
    href,
    active = false,
}: Readonly<{ children: React.ReactNode; href: string; active?: boolean }>) {
    return (
        <Link
            href={{ pathname: href }}
            className="relative after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-2 after:w-full
                after:origin-left after:scale-x-0 after:bg-ctp-lavender after:transition-transform
                md:hover:after:scale-x-100"
        >
            <span
                className={
                    active
                        ? `underline decoration-ctp-lavender decoration-8 underline-offset-[-2px] opacity-90
                            md:no-underline`
                        : ''
                }
            >
                {children}
            </span>
        </Link>
    )
}
