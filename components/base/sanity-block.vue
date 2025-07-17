<template>
  <div :class="$style.wrapper">
    <portable-text :value="props.blocks" :components="components" />
  </div>
</template>

<script lang="ts" setup>
import type { PortableTextBlock } from '@portabletext/types'
import { PortableText } from '@portabletext/vue'
import { h } from 'vue'

import ArticleImage from '~/components/base/article-image.vue'
import ArticleLink from '~/components/base/article-link.vue'
import Blockquote from '~/components/base/blockquote.vue'
import Poem from '~/components/base/poem.vue'
import QuoteAuthor from '~/components/base/quote-author.vue'

interface SanityContentProps {
  blocks: Array<PortableTextBlock>
}
const props = defineProps<SanityContentProps>()

const components = {
  marks: {
    link: (props: any) => h(ArticleLink, { href: props.value.href }, () => props.children),
  },
  block: {
    blockquote: (props: any) => h(Blockquote, {}, { default: () => props.node.children[0].text }),
    pre: (props: any) => h(Poem, {}, { default: () => props.node.children[0].text }),
    sub: (props: any) => h(QuoteAuthor, {}, { default: () => props.node.children[0].text }),
  },
  types: {
    image: (props: any) => h(ArticleImage, { asset: props.value.asset, alt: props.value.alt }),
  },
}
</script>

<style module>
.wrapper {
  text-align: justify;
}
</style>
