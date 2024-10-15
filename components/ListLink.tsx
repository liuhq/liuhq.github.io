import Link from 'next/link'

export default function ListLink({ children, href }: Readonly<{ children: React.ReactNode; href: string }>) {
    return (
        <Link
            href={{ pathname: href }}
            className="after:-z-10 after:origin-left after:scale-x-0 hover:after:scale-x-100 relative after:absolute
                after:bottom-0 after:left-0 after:h-2 after:w-full after:bg-rosewater after:transition-transform"
        >
            {children}
        </Link>
    )
}
