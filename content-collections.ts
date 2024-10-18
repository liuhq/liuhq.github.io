import { defineCollection, defineConfig, z } from '@content-collections/core'

const posts = defineCollection({
    name: 'posts',
    directory: 'content/posts',
    include: ['**/*.md'],
    schema: z => ({
        title: z.string(),
        date: z.string().date(),
        tags: z.array(z.string()).default(['其他']),
    }),
})

const data = defineCollection({
    name: 'data',
    parser: 'json',
    directory: 'content/data',
    include: ['**/*.json'],
    schema: z => ({
        home_url: z.string(),
    }),
})

export default defineConfig({
    collections: [posts, data],
})
