<script lang="ts" setup>
import type { SanityResume } from '~/@types/sanity'
import groq from 'groq'
import linkButton from '~/components/base/link-button.vue'
import { useLanguage } from '~/composables/useLanguage'
import { sanityClient } from '~/composables/useSanity'
import { useTranslations } from '~/composables/useTranslations'

const { lang } = useLanguage()
const { t } = useTranslations()

useHead({
  title: t('resume.title'),
  meta: [
    { name: 'description', content: t('resume.description') },
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
  <div :class="$style.page">
    <div :class="$style.actions">
      <link-button variant="primary" @click="print">
        {{ t('resume.print') }}
      </link-button>
    </div>

    <article :class="$style.resume">
      <header :class="$style.header">
        <div :class="$style.headerName">
          <h1 :class="$style.name">
            Leda Wolf
          </h1>
          <p :class="$style.career">
            {{ t('resume.career') }}
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

      <section v-if="resume?.experience?.length" :class="[$style.section, $style.pageBreak]">
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

      <section v-if="resume?.education?.length" :class="[$style.section, $style.pageBreak]">
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
              {{ t('resume.languages.fluent') }}
            </dd>
          </div>
          <div :class="$style.skillGroup">
            <dt :class="$style.skillCategory">
              {{ t('resume.conversational') }}
            </dt>
            <dd :class="$style.skillItems">
              {{ t('resume.languages.conversational') }}
            </dd>
          </div>
          <div :class="$style.skillGroup">
            <dt :class="$style.skillCategory">
              {{ t('resume.basic') }}
            </dt>
            <dd :class="$style.skillItems">
              {{ t('resume.languages.basic') }}
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

<style module>
.actions {
  max-width: 20rem;
  margin: 0 auto;
  padding: 1rem;
}

.page {
  min-height: 100vh;
  padding: 1rem;
  font-family: 'Fira Sans', sans-serif;
  color: var(--text-color);
}

.resume {
  background: var(--background-color);
  border-radius: var(--border-radius);
  max-width: 210mm;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 4px 24px var(--shadow);
}

.header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--accent);
}

.name {
  font-family: 'Silkscreen', sans-serif;
  font-size: 2.5rem;
  line-height: 3rem;
  margin: 0 0 0.2rem;
  letter-spacing: 0.02em;
}

.career {
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
  font-family: 'Satisfy', cursive;
  font-size: 1.5rem;
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
  min-width: 14rem;
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
  font-size: 1.2rem;
  line-height: 1.4;
}

.company {
  font-family: 'Silkscreen', sans-serif;
}

.role {
  font-family: 'Fira Sans Condensed', sans-serif;
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
  @page {
    size: A4 portrait;
    margin: 50px;
    background: none;
  }

  body {
    background: none !important;
  }

  .pageBreak {
    break-before: page;
  }

  h1, h2, h3, h4, h5 {
    color: black !important;
    break-after: avoid;
  }

  footer {
    display: none !important;
  }

  nav {
    display: none !important;
  }

  .actions {
    display: none !important;
  }

  .page {
    background: none !important;
  }

  .resume {
    color: black;
    background: none !important;
  }

  .company {
    color: black;
  }
}
</style>
