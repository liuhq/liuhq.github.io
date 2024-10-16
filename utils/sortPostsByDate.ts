import type { Post } from 'content-collections'
import { compareAsc, compareDesc } from 'date-fns'

export default function sortPostsByDate(allPost: ReadonlyArray<Post>, asc: boolean = false): Array<Post> {
    return allPost.toSorted((l, r) => (asc ? compareAsc(l.date, r.date) : compareDesc(l.date, r.date)))
}
