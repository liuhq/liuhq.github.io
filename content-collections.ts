import { defineCollection, defineConfig } from '@content-collections/core'

const posts = defineCollection({
    name: 'posts',
    directory: 'content/posts',
    include: ['**/*.md'],
    schema: z => ({
        title: z.string(),
        date: z.string().date(),
        update: z.string().date().optional(),
        tags: z.array(z.string()).default(['其他']),
        pin: z.boolean().default(false),
        uuid: z.string().uuid(),
        related: z.array(z.string().uuid()).optional(),
    }),
    onSuccess: docs => {
        console.log(`\n--- generated posts: ${docs.length} ---`)
        for (const doc of docs) {
            console.log(`    + ${doc._meta.filePath}`)
        }
        console.log('')
    },
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
        site_lang: z.string(),
        header_title: z.string(),
        prefList: z.array(
            z.object({
                name: z.string(),
                items: z.array(z.string()),
            })
        ),
        repo: z.array(
            z.object({
                owner: z.string(),
                repo: z.string(),
            })
        ),
        notfound_words: z.array(z.string()),
    }),
    onSuccess: docs => {
        console.log(`--- generated data: ${docs.length} ---`)
        for (const doc of docs) {
            console.log(`    + ${doc._meta.filePath}`)
        }
        console.log('')
    },
})

const aboutme = defineCollection({
    name: 'aboutme',
    directory: 'content/aboutme',
    include: ['**/*.md'],
    schema: z => ({
        title: z.string(),
        update: z.string().date(),
    }),
    onSuccess: docs => {
        console.log(`--- generated aboutme: ${docs.length} ---`)
        for (const doc of docs) {
            console.log(`    + ${doc._meta.filePath}`)
        }
        console.log('')
    },
})

export default defineConfig({
    collections: [posts, data, aboutme],
})
