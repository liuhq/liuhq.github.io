import { Rampart_One, JetBrains_Mono } from 'next/font/google'

export const rampart_one = Rampart_One({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-rampart-one',
})

export const jetBrains_mono = JetBrains_Mono({
    subsets: ['latin', 'latin-ext'],
    variable: '--font-jetBrains-mono',
})
