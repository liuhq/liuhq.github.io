import { useCallback, useState } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import rehypeReact, { type Options as RehypeReactOptions } from 'rehype-react'
import remarkParse, { type Options as RemarkParseOptions } from 'remark-parse'
import remarkRehype, { type Options as RemarkRehypeOptions } from 'remark-rehype'
import { unified, type PluggableList } from 'unified'

export interface UseRemarkOptions {
    remarkParseOptions?: RemarkParseOptions
    remarkPlugins?: PluggableList
    remarkRehypeOptions?: RemarkRehypeOptions
    rehypePlugins?: PluggableList
    rehypeReactOptions?: Pick<RehypeReactOptions, 'components'>
    onError?: (err: Error) => void
}

export default function useRemark({
    remarkParseOptions,
    remarkPlugins = [],
    remarkRehypeOptions,
    rehypePlugins = [],
    rehypeReactOptions,
    onError = () => {},
}: UseRemarkOptions = {}): [React.ReactElement | null, (source: string) => void] {
    const [content, setContent] = useState<React.ReactElement | null>(null)

    const setMarkdown = useCallback((source: string) => {
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
            // get react elements
            .then(vfile => setContent(vfile.result))
            .catch(onError)
    }, [])

    return [content, setMarkdown]
}
