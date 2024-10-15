import type { Post } from '@/.content-collections/generated'
import sortPostsByDate from './sortPostsByDate'

interface SplitByTagType {
    tags: Array<string>
    [tag: string]: Array<Post | string>
}

export default function splitByTag(allPosts: ReadonlyArray<Post>): SplitByTagType {
    const ret: SplitByTagType = {
        tags: [],
    }
    const sorted = sortPostsByDate(allPosts)
    sorted.map(post => {
        const tags = post.tags
        tags.map(tag => {
            // push tag
            !ret.tags.includes(tag) && ret.tags.push(tag)
            // push post
            if (ret[tag]) {
                ret[tag].push(post)
            } else {
                ret[tag] = [post]
            }
        })
    })

    return ret
}
