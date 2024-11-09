import React, { useEffect, useMemo, useState } from 'react'
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
): React.ReactElement | null {
    const [content, setContent] = useState<React.ReactElement | null>(null)

    useEffect(() => {
        unified()
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
            .then(vf => setContent(vf.result))
            .catch(err => console.error(err))
    }, [source])

    return content
}
