const translations = {
  en: {
    'hero.tagline': 'I\'m a software engineer',
    'hero.pitch': 'Let\'s see if I\'m a <u>good fit</u> for your company.',
    'nav.who': 'Who?',
    'nav.previously': 'Previously',
    'nav.blog': 'Blog',
    'nav.working-with': 'Working with Leda',
    'nav.contact': 'Contact',
    'section.who': 'Who?',
    'section.reviews': 'Working with Leda',
    'section.contact': 'What is she up to?',
    'resume.profile': 'Profile',
    'resume.skills': 'Skills',
    'resume.experience': 'Experience',
    'resume.education': 'Education',
    'resume.languages': 'Languages',
    'resume.additional': 'Additional',
    'resume.fluent': 'Fluent',
    'resume.conversational': 'Conversational',
    'resume.basic': 'Basic',
    'resume.back': '← Back',
    'resume.print': 'Print / Save as PDF',
  },
  de: {
    'hero.tagline': 'Ich bin Software-Entwicklerin',
    'hero.pitch': 'Lass uns herausfinden, ob ich <u>gut zu Euch passe</u>.',
    'nav.who': 'Wer?',
    'nav.previously': 'Bisher',
    'nav.blog': 'Blog',
    'nav.working-with': 'Mit Leda arbeiten',
    'nav.contact': 'Kontakt',
    'section.who': 'Wer?',
    'section.reviews': 'Reviews',
    'section.contact': 'Was macht sie gerade?',
    'resume.profile': 'Profil',
    'resume.skills': 'Kenntnisse',
    'resume.experience': 'Berufserfahrung',
    'resume.education': 'Ausbildung',
    'resume.languages': 'Sprachen',
    'resume.additional': 'Weiteres',
    'resume.fluent': 'Fließend',
    'resume.conversational': 'Konversationssicher',
    'resume.basic': 'Grundkenntnisse',
    'resume.back': 'Zurück',
    'resume.print': 'Drucken / Als PDF speichern',
  },
} as const

type TranslationKey = keyof typeof translations.en

export function useTranslations() {
  const { lang } = useLanguage()
  const t = (key: TranslationKey): string => translations[lang.value][key] ?? translations.en[key]
  return { t }
}
