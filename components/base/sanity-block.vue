<template>
  <div :class="$style.wrapper" role="article">
    <portable-text
      :value="props.blocks"
      :components="components"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PortableTextBlock } from '@portabletext/types'
import { PortableText } from '@portabletext/vue'
import { computed, h } from 'vue'

import ArticleImage from '~/components/base/article-image.vue'
import ArticleLink from '~/components/base/article-link.vue'
import Blockquote from '~/components/base/blockquote.vue'
import Poem from '~/components/base/poem.vue'
import QuoteAuthor from '~/components/base/quote-author.vue'

interface SanityContentProps {
  blocks: Array<PortableTextBlock>
}

const props = defineProps<SanityContentProps>()

const components = computed(() => ({
  marks: {
    link: (props: any) => {
      if (!props.value?.href) {
        console.warn('Link mark missing href:', props.value)
        return h('span', {}, () => props.children)
      }
      return h(ArticleLink, { href: props.value.href }, () => props.children)
    },
  },
  block: {
    blockquote: (props: any) => {
      const text = props.node.children?.[0]?.text || ''
      return h(Blockquote, {}, { default: () => text })
    },
    pre: (props: any) => {
      const text = props.node.children?.[0]?.text || ''
      return h(Poem, {}, { default: () => text })
    },
    sub: (props: any) => {
      const text = props.node.children?.[0]?.text || ''
      return h(QuoteAuthor, {}, { default: () => text })
    },
  },
  types: {
    image: (props: any) => {
      if (!props.value?.asset?._ref) {
        console.warn('Image missing asset reference:', props.value)
        return h('div', { class: 'missing-image' }, 'Image not found')
      }
      return h(ArticleImage, {
        asset: props.value.asset,
        alt: props.value.alt || 'Image',
      })
    },
  },
  unknownType: (props: any) => {
    console.warn('Unknown Sanity type:', props.value._type, props.value)
    return h('div', {
      'class': 'unknown-type',
      'data-type': props.value._type,
    }, `Unknown content type: ${props.value._type}`)
  },
}))
</script>

<style module>
.wrapper {
  text-align: justify;
}

.missing-image,
.unknown-type {
  padding: 1rem;
  background: #f5f5f5;
  border: 1px dashed #ccc;
  border-radius: 4px;
  color: #666;
  font-style: italic;
}
</style>
