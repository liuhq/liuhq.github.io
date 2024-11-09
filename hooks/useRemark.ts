import { useMemo } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import rehypeReact, { type Options as RehypeReactOptions } from 'rehype-react'
import remarkParse, { type Options as RemarkParseOptions } from 'remark-parse'
import remarkRehype, { type Options as RemarkRehypeOptions } from 'remark-rehype'
import { unified, type PluggableList } from 'unified'

export interface UseRemarkOptions {
    source: string
    remarkParseOptions?: RemarkParseOptions
    remarkPlugins?: PluggableList
    remarkRehypeOptions?: RemarkRehypeOptions
    rehypePlugins?: PluggableList
    rehypeReactOptions?: Pick<RehypeReactOptions, 'components'>
}

export default function useRemark(
    {
        source,
        remarkParseOptions,
        remarkPlugins = [],
        remarkRehypeOptions,
        rehypePlugins = [],
        rehypeReactOptions,
    }: UseRemarkOptions = { source: '' }
): Promise<React.ReactElement> {
    const content = useMemo(async () => {
        const processor = await unified()
            // parse markdown to mdast
            .use(remarkParse, remarkParseOptions)
            .use(remarkPlugins)
            // mdast to hast
            .use(remarkRehype, remarkRehypeOptions)
            .use(rehypePlugins)
            // hast to react elements
            .use(rehypeReact, {
                ...rehypeReactOptions,
                Fragment: jsxRuntime.Fragment,
                jsx: jsxRuntime.jsx,
                jsxs: jsxRuntime.jsxs,
            } satisfies RehypeReactOptions)
            .process(source)
        // get react elements
        return processor.result
    }, [source])

    return content
}
