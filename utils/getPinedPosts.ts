import type { Post } from '@/.content-collections/generated'
import sortPostsByDate from './sortPostsByDate'

export default function getPinedPosts(allPosts: ReadonlyArray<Post>): Array<Post> {
    return sortPostsByDate(allPosts).filter(post => post.pin)
}
