import type { Post } from 'content-collections'
import { compareAsc, compareDesc } from 'date-fns'

export default function sortPostsByDate(
    allPost: ReadonlyArray<Post>,
    option: Partial<{ asc: boolean; update: boolean }> = {
        asc: false,
        update: false,
    }
): Array<Post> {
    return allPost.toSorted((l, r) => {
        let ldate = option.update ? l.update || l.date : l.date
        let rdate = option.update ? r.update || r.date : r.date
        let ret = option.asc ? compareAsc(ldate, rdate) : compareDesc(ldate, rdate)
        // sort by #num when the same date
        if (ret == 0) {
            ret = -l.title.localeCompare(r.title)
        }
        return ret
    })
}
