import Link from 'next/link'

export default function Page() {
    return (
        <>
            <h1 className="font-bold text-red-500 text-7xl">root</h1>
            <Link href={'/post'}>Post</Link>
        </>
    )
}
