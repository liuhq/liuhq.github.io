import Link from 'next/link'

export default function NavLink({ children, href }: Readonly<{ children: React.ReactNode; href: string }>) {
    return (
        <Link
            href={{ pathname: href }}
            className="relative after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-2 after:w-full
                after:origin-left after:scale-x-0 after:bg-ctp-rosewater after:transition-transform
                md:hover:after:scale-x-100"
        >
            {children}
        </Link>
    )
}
