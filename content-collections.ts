import { defineCollection, defineConfig } from '@content-collections/core'
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify, { type Options as RehypeStringifyOptions } from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype, { type Options as RemarkRehypeOptions } from 'remark-rehype'
import { unified } from 'unified'

const render = async (content: string) => {
    const processor = unified()
        .use(remarkParse)
        .use([remarkGfm])
        .use(remarkRehype, { allowDangerousHtml: true } satisfies RemarkRehypeOptions)
        .use([rehypeRaw, rehypeSlug, [rehypeShiki, { theme: 'catppuccin-mocha' } satisfies RehypeShikiOptions]])
        .use(rehypeStringify, {
            allowDangerousCharacters: true,
        } satisfies RehypeStringifyOptions)

    const rendered = await processor.process(content)

    return String(rendered)
}

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
    transform: async (doc, { cache }) => {
        const html = await cache(doc.content, render)
        return {
            ...doc,
            content: html,
        }
    },
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
    transform: async (doc, { cache }) => {
        const html = await cache(doc.content, render)
        return {
            ...doc,
            content: html,
        }
    },
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
