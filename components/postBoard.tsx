import { allPosts, type Post } from '@/.content-collections/generated'
import getLatestPosts from '@/utils/getLatestPosts'
import getPinedPosts from '@/utils/getPinedPosts'
import { RiPushpin2Fill, RiQuillPenFill } from '@remixicon/react'
import { getYear } from 'date-fns'
import ListBoard from './listBoard'
import PostList from './postList'

export default async function PostBoard() {
    const pined = getPinedPosts(allPosts)
    const latest = getLatestPosts(allPosts)

    return (
        <div className="flex flex-col gap-6">
            <PostPined posts={pined} />
            <PostLatest posts={latest} />
        </div>
    )
}

const PostPined = ({ posts }: Readonly<{ posts: Array<Post> }>) => (
    <ListBoard
        title={
            <>
                <RiPushpin2Fill className="mr-1 size-5" />
                置顶
            </>
        }
    >
        {posts.length == 0 ? (
            <p className="pt-4 text-center text-sm italic text-ctp-overlay1">暂无置顶哦~~~</p>
        ) : (
            <PostList posts={posts} />
        )}
    </ListBoard>
)

const PostLatest = ({ posts }: Readonly<{ posts: Array<Post> }>) => (
    <ListBoard
        title={
            <>
                <RiQuillPenFill className="mr-1 size-5" />
                最新笔记
            </>
        }
        toMore={{
            name: '查阅所有',
            url: `/archive/${getYear(posts[0].date)}`,
        }}
    >
        <PostList posts={posts} />
    </ListBoard>
)
