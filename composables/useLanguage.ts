import { useLocalStorage } from '@vueuse/core'

export function useLanguage() {
  const lang = useLocalStorage<'en' | 'de'>('vuelfden-lang', 'en')
  return { lang }
}
