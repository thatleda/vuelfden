import antfu from '@antfu/eslint-config'
import groq from '@asbjorn/eslint-plugin-groq'

export default antfu({
  vue: true,
  rules: {
    'node/prefer-global/process': 'off',
    'vue/component-name-in-template-casing': ['warn', 'kebab-case'],
    'vue/block-order': ['warn', { order: ['template', 'script', 'style'] }],
  },
}).prepend([{ plugins: { groq }, rules: { 'groq/no-syntax-errors': 'error', 'groq/no-template-expressions': 'error' } }])
