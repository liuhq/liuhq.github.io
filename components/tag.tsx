export default function Tag({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <div className="rounded bg-ctp-surface0 px-1 text-sm text-ctp-subtext1">{children}</div>
}
