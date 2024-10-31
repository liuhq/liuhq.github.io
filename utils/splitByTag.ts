import type { Post } from '@/.content-collections/generated'

interface SplitByTagType {
    tags: Array<string>
    [tag: string]: Array<Post | string>
}

export default function splitByTag(posts: ReadonlyArray<Post>): SplitByTagType {
    const ret: SplitByTagType = {
        tags: [],
    }
    posts.map(post => {
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
