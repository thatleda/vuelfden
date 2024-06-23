import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  rules: {
    'node/prefer-global/process': 'off',
    'vue/component-name-in-template-casing': ['warn', 'kebab-case'],
    'vue/block-order': ['warn', { order: ['template', 'script', 'style'] }],
  },
})
