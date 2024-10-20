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

const data = defineCollection({
    name: 'data',
    parser: 'json',
    directory: 'content/data',
    include: ['**/*.json'],
    schema: z => ({
        home_url: z.string(),
        pin: z
            .array(
                z.object({
                    owner: z.string(),
                    repo: z.string(),
                })
            )
            .min(0)
            .max(4),
    }),
})

const aboutme = defineCollection({
    name: 'aboutme',
    directory: 'content/aboutme',
    include: ['**/*.md'],
    schema: z => ({
        title: z.string(),
        date: z.string().date(),
    }),
})

export default defineConfig({
    collections: [posts, data, aboutme],
})
