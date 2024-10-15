import PinSomething from '@/components/pinSomething'
import Profile from '@/components/profile'

export default function Page() {
    return (
        <main className="grid place-content-center place-items-center gap-1 md:grid-cols-2">
            <Profile />
            <PinSomething />
        </main>
    )
}
