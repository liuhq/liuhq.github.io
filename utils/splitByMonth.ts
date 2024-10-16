import type { Post } from '@/.content-collections/generated'
import sortPostsByDate from './sortPostsByDate'
import { getMonth, getYear } from 'date-fns'

export interface SplitByMonthType {
    months: Array<string>
    [month: string]: Array<Post | string>
}

export default function splitByMonth(allPosts: ReadonlyArray<Post>): SplitByMonthType {
    const ret: SplitByMonthType = {
        months: [],
    }
    const sorted = sortPostsByDate(allPosts, true)
    sorted.map(post => {
        const month = (getMonth(post.date) + 1).toString()
        // push year
        !ret.months.includes(month) && ret.months.push(month)
        // push post
        if (ret[month]) {
            ret[month].push(post)
        } else {
            ret[month] = [post]
        }
    })

    return ret
}
