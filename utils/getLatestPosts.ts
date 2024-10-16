import type { Post } from '@/.content-collections/generated'
import sortPostsByDate from './sortPostsByDate'

export default function getLatestPosts(allPosts: ReadonlyArray<Post>): Array<Post> {
    return sortPostsByDate(allPosts).slice(0, 3)
}
