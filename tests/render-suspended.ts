import type { Component } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, h, Suspense } from 'vue'

export async function renderSuspended(component: Component) {
  const container = document.body.appendChild(document.createElement('div'))

  const wrapper = mount(defineComponent({
    setup() {
      return () => h(Suspense, null, {
        default: () => h(component),
      })
    },
  }), { attachTo: container })

  await flushPromises()

  return { wrapper, container }
}
