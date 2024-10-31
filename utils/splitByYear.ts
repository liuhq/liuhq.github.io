import type { Post } from '@/.content-collections/generated'
import { getYear } from 'date-fns'

interface SplitByYearType {
    years: Array<string>
    [year: string]: Array<Post | string>
}

export default function splitByYear(posts: ReadonlyArray<Post>): SplitByYearType {
    const ret: SplitByYearType = {
        years: [],
    }
    posts.map(post => {
        const year = getYear(post.date).toString()
        // push year
        !ret.years.includes(year) && ret.years.push(year)
        // push post
        if (ret[year]) {
            ret[year].push(post)
        } else {
            ret[year] = [post]
        }
    })

    return ret
}
