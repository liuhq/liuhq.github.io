import React, { useMemo } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import rehypeParse, { type Options as RehypeParseOptions } from 'rehype-parse'
import rehypeReact, { type Options as RehypeReactOptions } from 'rehype-react'
import { unified } from 'unified'

export interface UseRemarkOptions {
    source: string
    rehypeReactOptions?: Pick<RehypeReactOptions, 'components'>
}

export default function useRehype({ source = '', rehypeReactOptions = {} }: UseRemarkOptions): React.ReactElement {
    const rendered = useMemo(
        () =>
            unified()
                .use(rehypeParse, { fragment: true } satisfies RehypeParseOptions)
                .use(rehypeReact, {
                    ...rehypeReactOptions,
                    Fragment: jsxRuntime.Fragment,
                    jsx: jsxRuntime.jsx,
                    jsxs: jsxRuntime.jsxs,
                } satisfies RehypeReactOptions)
                .processSync(source).result,
        [source]
    )

    return rendered
}
