<template>
  <article :class="$style.wrapper">
    <slate-renderer :document="document" />
  </article>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import Blockquote from '~/components/base/blockquote.vue'

interface SlateText {
  text: string
  object: 'text'
  bold?: boolean
  italic?: boolean
  spoiler?: boolean
}

interface SlateBlock {
  type: string
  object: 'block'
  data: Record<string, any>
  children: Array<SlateBlock | SlateText>
}

interface SlateDocument {
  document: {
    object: 'document'
    children: Array<SlateBlock>
  }
}

interface SlateBlockProps {
  document: SlateDocument
}

defineProps<SlateBlockProps>()

const SlateRenderer = {
  name: 'SlateRenderer',
  props: {
    document: {
      type: Object as () => SlateDocument,
      required: true,
    },
  },
  setup(props: { document: SlateDocument }) {
    return () => {
      if (!props.document?.document?.children) {
        return h('p', {}, 'No content available')
      }
      return h('div', {}, props.document.document.children.map(renderBlock))
    }
  },
}

const SpoilerText = {
  name: 'SpoilerText',
  setup(_props: any, { slots }: any) {
    const revealed = ref(false)

    const toggleReveal = () => {
      revealed.value = !revealed.value
    }

    return () => {
      if (revealed.value) {
        return slots.default()
      }

      return h(
        'button',
        {
          'type': 'button',
          'aria-label': 'Reveal spoiler',
          'class': 'spoiler-button',
          'onClick': toggleReveal,
        },
        'spoiler',
      )
    }
  },
}

function renderBlock(block: SlateBlock): any {
  switch (block.type) {
    case 'paragraph':
      return h('p', {}, renderChildren(block.children))

    case 'block-quote':
      return h(Blockquote, {}, { default: () => renderChildren(block.children) })

    case 'bulleted-list':
      return h('ul', {}, renderChildren(block.children))

    case 'numbered-list':
      return h('ol', {}, renderChildren(block.children))

    case 'list-item':
      return h('li', {}, renderChildren(block.children))

    default:
      console.warn('Unknown Slate block type:', block.type)
      return h('div', {}, renderChildren(block.children))
  }
}

function renderChildren(children: Array<SlateBlock | SlateText>): any[] {
  return children.map((child) => {
    if ('text' in child) {
      return renderText(child)
    }
    return renderBlock(child)
  })
}

function renderText(node: SlateText): any {
  let content: any = node.text

  if (node.spoiler) {
    return h(SpoilerText, {}, { default: () => content })
  }

  if (node.bold) {
    content = h('strong', {}, content)
  }

  if (node.italic) {
    content = h('em', {}, content)
  }

  return content
}
</script>

<style module>
.wrapper {
  text-align: justify;
}

.wrapper :global(.spoiler-button) {
  background: var(--background-color);
  border: 1px solid var(--text-color);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  color: var(--text-color);
  transition: background 0.2s;
}

.wrapper :global(.spoiler-button:hover) {
  background: var(--text-color);
  color: var(--background-color);
}

.wrapper :global(.spoiler-button:focus) {
  outline: 2px solid var(--text-color);
  outline-offset: 2px;
}
</style>
