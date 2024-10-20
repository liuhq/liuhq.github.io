'use client'

import { allData } from '@/.content-collections/generated'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
    const [word, setWord] = useState('')
    const [caret, setCatet] = useState(0)
    const [iword, setIword] = useState(0)
    const [deleting, setDeleting] = useState(false)
    const words = allData.find(data => data._meta.path == 'profile')!.notfound_words

    useEffect(() => {
        const currentWord = words[iword]

        const timer = setInterval(() => {
            if (deleting) {
                setWord(currentWord.substring(0, caret - 1))
                setCatet(caret - 1)
                if (caret == 0) {
                    setDeleting(false)
                    iword < words.length - 1 ? setIword(iword + 1) : setIword(0)
                }
            } else {
                setWord(currentWord.substring(0, caret + 1))
                setCatet(caret + 1)
                if (caret == currentWord.length) {
                    const timeOut = setTimeout(() => {
                        setDeleting(true)
                        clearTimeout(timeOut)
                    }, 500)
                }
            }
        }, 100)

        return () => clearInterval(timer)
    })

    return (
        <div className="mt-24 w-full self-start px-4 md:mt-0 md:self-center">
            <h1 className="mb-2 w-fit border border-ctp-red text-2xl">
                <span className="bg-ctp-red px-2 font-bold text-ctp-crust">404</span>
                <span className="px-2">NOT FOUND</span>
            </h1>
            <Link href="/" className="md:hover:text-ctp-red">
                返回主页
            </Link>
            <code className="block text-ctp-red">---</code>
            <p className="h-6 text-ctp-red md:mt-12">{word}</p>
        </div>
    )
}
