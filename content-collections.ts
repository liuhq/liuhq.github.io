import { defineCollection, defineConfig } from '@content-collections/core'

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

export default defineConfig({
    collections: [posts],
})
