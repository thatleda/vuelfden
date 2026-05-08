import antfu from '@antfu/eslint-config'
import playwright from 'eslint-plugin-playwright'
import testingLibrary from 'eslint-plugin-testing-library'

const noCommentsRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Comments are not allowed in this project as they can cause unnecessary noise or leak into production code. Check configuration to see the exceptions from this rule.',
    },
    fixable: 'code',
  },
  create(context) {
    const { sourceCode } = context
    function processComment(comment) {
      if (comment.type === 'Shebang')
        return
      const options = context.options[0] || {}
      const allow = (options && options.allow) || []
      const defaults = ['global', 'eslint', '@ts-', '@typescript-eslint', '\\/']
      const re = new RegExp(String.raw`^\s?(${[...defaults, ...allow].join('|')})`)
      if (comment && !re.test(comment.value)) {
        context.report({
          fix(fixer) {
            return fixer.remove(comment)
          },
          loc: comment.loc,
          message: 'Comments are forbidden',
          node: null,
        })
      }
    }
    return {
      Program() {
        const comments = sourceCode.getAllComments()
        comments.forEach(processComment)
      },
    }
  },
}

export default antfu({
  vue: {
    a11y: true,
  },
  rules: {
    'node/prefer-global/process': 'off',
    'yaml/sort-keys': 'off',
  },
}, { files: ['components/page-header.vue'], rules: { 'vue-a11y/no-aria-hidden-on-focusable': 'off' } }, {
  plugins: {
    matt: {
      rules: {
        'no-comments': noCommentsRule,
      },
    },
  },
  rules: {
    'matt/no-comments': 'error',
  },
}, {
  files: [
    'components/**/*.spec.{js,ts,vue}',
  ],
  ...testingLibrary.configs['flat/vue'],
}, {
  files: ['e2e/**/*.spec.{js,ts}'],
  ...playwright.configs['flat/recommended'],
  rules: {
    'e18e/prefer-static-regex': 'off',
  },
})
