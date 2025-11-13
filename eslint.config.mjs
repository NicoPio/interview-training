// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // Files and directories to ignore
  ignores: [
    '**/node_modules/**',
    '**/.nuxt/**',
    '**/.output/**',
    '**/.nitro/**',
    '**/.cache/**',
    '**/dist/**',
    '**/build/**',
    '**/coverage/**',
    '**/.nyc_output/**',
    '**/*.min.js',
    '**/*.min.mjs',
    '**/.data/**',
    '**/.vscode/**',
    '**/.idea/**',
    '**/.DS_Store',
    '**/*.log',
    '**/*.tmp',
    '**/.env',
    '**/.env.*',
  ],

  rules: {
    // Indentation rules (basic only, no @stylistic)
    'indent': ['error', 2, { SwitchCase: 1 }],
    'vue/html-indent': ['error', 2],
    'vue/script-indent': ['error', 2, {
      baseIndent: 0,
      switchCase: 1
    }],

    // TypeScript strict mode rules
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off', // Vue composables don't need explicit return types
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/unified-signatures': 'off', // Known bug with Vue SFC files

    // Vue specific rules
    'vue/multi-word-component-names': 'off', // Allow single-word components
    'vue/require-default-prop': 'off', // TypeScript handles this
    'vue/no-v-html': 'warn', // Security warning for v-html

    // General code quality
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',

    // Nuxt specific - keep process.client for test compatibility
    'nuxt/prefer-import-meta': 'off'
  }
})
