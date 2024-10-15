import type { Post } from 'content-collections'
import { compareDesc } from 'date-fns'

export default function sortPostsByDate(allPost: ReadonlyArray<Post>): Array<Post> {
    return allPost.toSorted((l, r) => compareDesc(l.date, r.date))
}
