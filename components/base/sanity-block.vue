<template>
  <div :class="$style.wrapper">
    <sanity-content :blocks="props.blocks" :serializers="serializers" />
  </div>
</template>

<script lang="ts" setup>
import type { PortableTextBlock } from '@portabletext/types'

import ArticleImage from '~/components/base/article-image.vue'
import ArticleLink from '~/components/base/article-link.vue'
import Blockquote from '~/components/base/blockquote.vue'
import Poem from '~/components/base/poem.vue'
import QuoteAuthor from '~/components/base/quote-author.vue'

interface SanityContentProps {
  blocks: Array<PortableTextBlock>
}
const props = defineProps<SanityContentProps>()

const serializers = {
  marks: {
    link: ArticleLink,
  },
  styles: {
    blockquote: Blockquote,
    pre: Poem,
    sub: QuoteAuthor,
  },
  types: {
    image: ArticleImage,
  },
}
</script>

<style module>
.wrapper {
  text-align: justify;
}
</style>
