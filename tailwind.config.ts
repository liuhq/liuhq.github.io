import catppuccin from '@catppuccin/tailwindcss'
import typography from '@tailwindcss/typography'
import tailwindScrollbar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'
import type { PluginAPI } from 'tailwindcss/types/config'

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'selector',
  theme: {
    fontFamily: {
      mono: ['var(--font-jetBrains-mono)', 'ui-monospace', 'monospace'],
    },
    extend: {
      fontFamily: {
        special: ['var(--font-rampart-one)'],
      },
    },
  },
  plugins: [
    catppuccin({ prefix: 'ctp' }),
    typography,
    tailwindScrollbar({ preferredStrategy: 'pseudoelements' }),
    function ({ addVariant }: PluginAPI) {
      addVariant('prose-inline-code', '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))')
    },
  ],
}
export default config
