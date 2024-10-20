import PinSomething from '@/components/pinSomething'
import Profile from '@/components/profile'

export default function Page() {
    return (
        <main
            className="mt-[25%] grid place-content-center place-items-start gap-8 self-start px-4 md:mt-0 md:grid-cols-2
                md:gap-1 md:self-center md:px-0"
        >
            <Profile />
            <PinSomething />
        </main>
    )
}
