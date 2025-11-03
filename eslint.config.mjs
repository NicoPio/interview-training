// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'indent': ['error', 2],
    '@stylistic/indent': ['error', 2],
    'vue/html-indent': ['error', 2],
    'vue/script-indent': ['error', 2, {
      baseIndent: 0,
      switchCase: 1
    }]
  }
})
