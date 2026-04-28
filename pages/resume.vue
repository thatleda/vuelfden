<script lang="ts" setup>
import type { SanityResume } from '~/@types/sanity'
import { useDark, useToggle } from '@vueuse/core'
import groq from 'groq'
import svgMoon from '~/components/svg/moon.vue'
import svgSun from '~/components/svg/sun.vue'
import { useLanguage } from '~/composables/useLanguage'
import { sanityClient } from '~/composables/useSanity'
import { useTranslations } from '~/composables/useTranslations'

definePageMeta({ layout: false })

const darkMode = useDark({ storageKey: 'vuelfden-dark-mode', selector: 'body', valueDark: 'dark-mode', valueLight: 'light-mode' })
const toggleDarkMode = useToggle(darkMode)
const { lang } = useLanguage()
const { t } = useTranslations()

useHead({
  title: 'Leda Wolf — Resume',
  meta: [
    { name: 'description', content: 'Resume of Leda Wolf, Senior Fullstack Software Engineer' },
  ],
})

const resumeQuery = groq`*[_type == "resume" && language == $lang][0]{
  _id,
  profile,
  skills[]{ _key, category, items },
  experience[]{ _key, company, title, startDate, endDate, location, note, bullets },
  education[]{ _key, degree, institution, year, note },
  additionalSkills
}`

const { data: resume, refresh } = await useAsyncData(
  'resume',
  () => sanityClient().fetch<SanityResume>(resumeQuery, { lang: lang.value }),
)

watch(lang, () => refresh())

function print() {
  window.print()
}
</script>

<template>
  <div class="resume-page" :class="[$style.page]">
    <div :class="$style.actions">
      <NuxtLink to="/" :class="$style.backLink">
        ← {{ t('resume.back') }}
      </NuxtLink>
      <div :class="$style.actionButtons">
        <div :class="$style.langSwitch" role="group" aria-label="Language">
          <button
            :class="[$style.langButton, lang === 'en' && $style.langButtonActive]"
            type="button"
            @click="lang = 'en'"
          >
            EN
          </button>
          <button
            :class="[$style.langButton, lang === 'de' && $style.langButtonActive]"
            type="button"
            @click="lang = 'de'"
          >
            DE
          </button>
        </div>
        <button :class="$style.darkModeToggle" type="button" :aria-label="darkMode ? 'Switch to light mode' : 'Switch to dark mode'" @click="toggleDarkMode()">
          <svg-sun v-if="darkMode" height="1.5rem" width="1.5rem" />
          <svg-moon v-else height="1.5rem" width="1.5rem" />
        </button>
        <button :class="$style.printButton" type="button" @click="print">
          {{ t('resume.print') }}
        </button>
      </div>
    </div>

    <article :class="$style.resume">
      <header :class="$style.header">
        <div :class="$style.headerName">
          <h1 :class="$style.name">
            Leda Wolf
          </h1>
          <p :class="$style.jobTitle">
            Senior Fullstack Software Engineer
          </p>
        </div>
        <div :class="$style.contact">
          <span>Schwerin, Germany</span>
          <span aria-hidden="true">·</span>
          <a href="mailto:leda@sent.com">leda@sent.com</a>
          <span aria-hidden="true">·</span>
          <a href="tel:+4915773730361">+49 157 73730361</a>
          <span aria-hidden="true">·</span>
          <a href="https://ledawolf.info">ledawolf.info</a>
        </div>
      </header>

      <section v-if="resume?.profile" :class="$style.section">
        <h2 :class="$style.sectionTitle">
          {{ t('resume.profile') }}
        </h2>
        <p :class="$style.profile">
          {{ resume.profile }}
        </p>
      </section>

      <section v-if="resume?.skills?.length" :class="$style.section">
        <h2 :class="$style.sectionTitle">
          {{ t('resume.skills') }}
        </h2>
        <dl :class="$style.skillList">
          <div v-for="group in resume.skills" :key="group._key" :class="$style.skillGroup">
            <dt :class="$style.skillCategory">
              {{ group.category }}
            </dt>
            <dd :class="$style.skillItems">
              {{ group.items.join(', ') }}
            </dd>
          </div>
        </dl>
      </section>

      <section v-if="resume?.experience?.length" :class="$style.section">
        <h2 :class="$style.sectionTitle">
          {{ t('resume.experience') }}
        </h2>
        <div
          v-for="entry in resume.experience"
          :key="entry._key"
          :class="$style.entry"
        >
          <div :class="$style.entryHeader">
            <div :class="$style.entryTitle">
              <strong :class="$style.company">{{ entry.company }}</strong>
              <span v-if="entry.title" :class="$style.role"> — {{ entry.title }}</span>
            </div>
            <div :class="$style.entryMeta">
              <span v-if="entry.startDate">
                {{ entry.startDate }}{{ entry.endDate ? ` – ${entry.endDate}` : '' }}
              </span>
              <span v-if="entry.location"> · {{ entry.location }}</span>
              <span v-if="entry.note" :class="$style.entryNote"> · {{ entry.note }}</span>
            </div>
          </div>
          <ul v-if="entry.bullets?.length" :class="$style.bullets">
            <li v-for="(bullet, i) in entry.bullets" :key="i">
              {{ bullet }}
            </li>
          </ul>
        </div>
      </section>

      <section v-if="resume?.education?.length" :class="$style.section">
        <h2 :class="$style.sectionTitle">
          {{ t('resume.education') }}
        </h2>
        <div
          v-for="entry in resume.education"
          :key="entry._key"
          :class="$style.entry"
        >
          <div :class="$style.entryHeader">
            <div :class="$style.entryTitle">
              <strong :class="$style.company">{{ entry.institution }}</strong>
              <span v-if="entry.degree" :class="$style.role"> — {{ entry.degree }}</span>
              <span v-if="entry.year"> ({{ entry.year }})</span>
            </div>
            <p v-if="entry.note" :class="$style.entryNote">
              {{ entry.note }}
            </p>
          </div>
        </div>
      </section>

      <section :class="$style.section">
        <h2 :class="$style.sectionTitle">
          {{ t('resume.languages') }}
        </h2>
        <dl :class="$style.skillList">
          <div :class="$style.skillGroup">
            <dt :class="$style.skillCategory">
              {{ t('resume.fluent') }}
            </dt>
            <dd :class="$style.skillItems">
              German, English, Russian
            </dd>
          </div>
          <div :class="$style.skillGroup">
            <dt :class="$style.skillCategory">
              {{ t('resume.conversational') }}
            </dt>
            <dd :class="$style.skillItems">
              Spanish, French
            </dd>
          </div>
          <div :class="$style.skillGroup">
            <dt :class="$style.skillCategory">
              {{ t('resume.basic') }}
            </dt>
            <dd :class="$style.skillItems">
              Ukrainian, Portuguese, Mandarin, Japanese
            </dd>
          </div>
        </dl>
      </section>

      <section v-if="resume?.additionalSkills?.length" :class="$style.section">
        <h2 :class="$style.sectionTitle">
          {{ t('resume.additional') }}
        </h2>
        <ul :class="$style.bullets">
          <li v-for="(item, i) in resume.additionalSkills" :key="i">
            {{ item }}
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<style>
.resume-page {
  --accent: #1a4d2e;
  --accent-border: #94e4af;
  --page-bg: #e8e8e8;
  --paper-bg: #ffffff;
  --text: #111111;
  --subtext: #444444;
  --muted: #666666;
  --shadow: rgba(0, 0, 0, 0.15);
}

body.dark-mode .resume-page {
  --accent: #94e4af;
  --accent-border: #527766;
  --page-bg: #1a1a1a;
  --paper-bg: #2a2a2a;
  --text: #e6e6e6;
  --subtext: #b1b1b1;
  --muted: #888888;
  --shadow: rgba(0, 0, 0, 0.5);
}

@media print {
  .resume-page {
    --page-bg: #fff;
    --paper-bg: #fff;
    --text: #111;
    --subtext: #444;
    --muted: #666;
    --accent: #1a4d2e;
    --accent-border: #94e4af;
  }
}
</style>

<style module>
.page {
  background: var(--page-bg);
  min-height: 100vh;
  padding: 2rem 1rem;
  font-family: 'Fira Sans', sans-serif;
  font-size: 14px;
  color: var(--text);
  transition: background 0.2s, color 0.2s;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 210mm;
  margin: 0 auto 1.5rem;
}

.actionButtons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.backLink {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
}

.langSwitch {
  display: flex;
  border: 1px solid var(--accent-border);
  border-radius: 4px;
  overflow: hidden;
}

.langButton {
  background: transparent;
  border: none;
  padding: 0.4rem 0.65rem;
  font-family: 'Fira Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--subtext);
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: var(--accent-border);
    color: var(--text);
  }
}

.langButtonActive {
  background: var(--accent);
  color: #fff;
}

.darkModeToggle {
  background: transparent;
  border: 1px solid var(--accent-border);
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.printButton {
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-family: 'Fira Sans', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
}

.resume {
  background: var(--paper-bg);
  max-width: 210mm;
  margin: 0 auto;
  padding: 20mm 18mm;
  box-shadow: 0 4px 24px var(--shadow);
  transition: background 0.2s, box-shadow 0.2s;
}

.header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--accent);
}

.name {
  font-family: 'Fira Sans', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
  margin: 0 0 0.2rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.jobTitle {
  font-size: 1rem;
  font-weight: 400;
  color: var(--subtext);
  margin: 0 0 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.contact {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.6rem;
  font-size: 0.85rem;
  color: var(--subtext);

  a {
    color: var(--accent);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.section {
  margin-bottom: 1.25rem;
}

.sectionTitle {
  font-family: 'Fira Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  border-bottom: 1px solid var(--accent-border);
  padding-bottom: 0.3rem;
  margin: 0 0 0.75rem;
}

.profile {
  margin: 0;
  line-height: 1.6;
  color: var(--text);
}

.skillList {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.skillGroup {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.skillCategory {
  font-weight: 600;
  color: var(--text);
  min-width: 7rem;
  flex-shrink: 0;

  &::after {
    content: ':';
  }
}

.skillItems {
  margin: 0;
  color: var(--subtext);
  flex: 1;
}

.entry {
  margin-bottom: 1rem;
  page-break-inside: avoid;
}

.entryHeader {
  margin-bottom: 0.4rem;
}

.entryTitle {
  font-size: 0.95rem;
  line-height: 1.4;
}

.company {
  color: var(--text);
  font-weight: 700;
}

.role {
  color: var(--subtext);
  font-weight: 400;
}

.entryMeta {
  font-size: 0.8rem;
  color: var(--muted);
  margin-top: 0.1rem;
}

.entryNote {
  font-style: italic;
  color: var(--muted);
}

.bullets {
  margin: 0.4rem 0 0;
  padding-left: 1.2rem;
  color: var(--subtext);

  li {
    margin-bottom: 0.25rem;
    line-height: 1.5;
  }
}

@media print {
  .actions {
    display: none;
  }

  .page {
    padding: 0;
  }

  .resume {
    box-shadow: none;
    max-width: 100%;
    padding: 15mm 15mm;
  }
}
</style>
