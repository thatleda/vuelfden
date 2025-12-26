import antfu from '@antfu/eslint-config'
import groq from '@asbjorn/eslint-plugin-groq'
import emojiRegex from 'emoji-regex'
import playwright from 'eslint-plugin-playwright'
import testingLibrary from 'eslint-plugin-testing-library'

const noEmojisRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Emojis aren\'t allowed in this project because I do not need them and they are worth way too many tokens.',
    },
    fixable: 'code',
  },
  create(context) {
    const regex = emojiRegex()
    const sourceCode = context.sourceCode || context.getSourceCode()

    function checkForEmojis(text, node) {
      if (typeof text !== 'string')
        return
      const match = text.match(regex)
      if (match) {
        context.report({
          message: 'Emojis are not allowed in this project',
          node,
          fix(fixer) {
            const nodeText = sourceCode.getText(node)
            const cleaned = nodeText.replace(/\s*\p{Emoji}\s*/gu, '')
            return fixer.replaceText(node, cleaned)
          },
        })
      }
    }

    return {
      Literal: node => checkForEmojis(node.value, node),
      TemplateElement: node => checkForEmojis(node.value.raw, node),
    }
  },
}

const noCommentsRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Comments are not allowed in this project as they can cause unnecessary noise or leak into production code. Check configuration to see the exceptions from this rule.',
    },
    fixable: 'code',
  },
  create(context) {
    const sourceCode = context.getSourceCode()
    function processComment(comment) {
      if (comment.type === 'Shebang')
        return
      const options = context.options[0] || {}
      const allow = (options && options.allow) || []
      let re = /^\s?(?:global|eslint|@ts-|@typescript-eslint)/
      if (allow.length > 0) {
        re = new RegExp(`^\\s?(${allow.join('|')})`)
      }
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
  vue: true,
  rules: {
    'node/prefer-global/process': 'off',
    'vue/component-name-in-template-casing': ['warn', 'kebab-case'],
    'vue/block-order': ['warn', { order: ['template', 'script', 'style'] }],
  },
}, {
  plugins: {
    matt: {
      rules: {
        'no-comments': noCommentsRule,
        'no-emojis': noEmojisRule,
      },
    },
  },
  rules: {
    'matt/no-comments': 'error',
  },
}, {
  plugins: { groq },
  rules: {
    'groq/no-syntax-errors': 'error',
    'groq/no-template-expressions': 'error',
  },
}, {
  files: [
    'components/**/*.spec.{js,ts,vue}',
  ],
  ...testingLibrary.configs['flat/vue'],
}, {
  files: ['e2e/**/*.spec.{js,ts}'],
  ...playwright.configs['flat/recommended'],
})
