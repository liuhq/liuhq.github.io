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
        author: z.object({
            full_name: z.string(),
            cn_name: z.string(),
            en_name: z.string(),
        }),
        home_url: z.string(),
        prefList: z.array(
            z.object({
                name: z.string(),
                items: z.array(z.string()),
            })
        ),
        pin: z
            .array(
                z.object({
                    owner: z.string(),
                    repo: z.string(),
                })
            )
            .min(0)
            .max(4),
        notfound_words: z.array(z.string()),
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
