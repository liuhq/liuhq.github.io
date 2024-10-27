import PostBoard from '@/components/postBoard'
import ProfileBoard from '@/components/profileBoard'

export default function Page() {
    return (
        <main
            className="mt-[25%] grid w-full justify-items-stretch gap-8 self-start px-4 md:mt-0 md:grid-cols-2 md:gap-4
                md:self-center md:px-0"
        >
            <ProfileBoard />
            <PostBoard />
        </main>
    )
}
