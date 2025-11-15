<template>
  <base-page-section :animation-props="{ animationDuration: '0ms' }">
    <div :class="$style.card">
      <NuxtImg
        :src="page.banner._id"
        :alt="page.banner.altText"
        :aria-label="page.banner.altText"
        width="200"
        loading="lazy"
        placeholder
      />
      <div :class="$style.callToAction">
        <h1 :class="$style.greeting">
          {{ page.title }}
        </h1>
        <h1 :class="$style.introduction">
          I'm a software engineer
        </h1>
        <h2 :class="$style.purpose">
          Let's see if I'm a <u>good fit</u> for your company.
        </h2>
        <base-sanity-block :blocks="page.content" />
        <base-transition-animation
          animation-duration="2s"
          animation-name="fade-left"
          :class="$style.actionButtons"
        >
          <base-link-button
            to="https://discord.com/users/732667625255075951"
            variant="secondary"
            aria-label="Discord"
          >
            Discord
          </base-link-button>
          <base-link-button
            to="https://github.com/thatleda"
            variant="secondary"
            aria-label="GitHub"
          >
            GitHub
          </base-link-button>
          <base-link-button
            to="https://www.linkedin.com/in/thatleda/"
            variant="secondary"
            aria-label="LinkedIn"
          >
            LinkedIn
          </base-link-button>
          <base-link-button
            to="mailto:leda@hey.com"
            variant="secondary"
            aria-label="Mail"
          >
            Mail
          </base-link-button>
          <base-link-button
            to="https://calendly.com/ledawolf/meeting"
            variant="primary"
            aria-label="Calendly"
          >
            Calendly
          </base-link-button>
        </base-transition-animation>
      </div>
    </div>
  </base-page-section>
</template>

<script lang="ts" setup>
import type { SanityPage } from '~/@types/sanity'

interface HeroProps {
  page: SanityPage
}

const { page } = defineProps<HeroProps>()
</script>

<style module>
.card {
  display: flex;
  flex-direction: row;
  gap: 5rem;
  align-items: center;
  background: var(--surface-primary);
  border-radius: var(--border-radius);

  @media (max-width: 1015px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0;
  }
}

.callToAction {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  margin: 0 auto;

  @media (max-width: 1000px) {
    gap: 1rem;
  }
}

.greeting {
  padding-bottom: 0;
  margin-bottom: 0;
  line-height: 0;
  text-align: start;
  color: var(--subtext-color);
}

.introduction {
  font-size: 2.5rem;
  line-height: 3rem;
  margin-bottom: 0;
  line-break: unset;
  text-shadow: var(--secondary-color) 1px 0 10px;
}

.purpose {
  font-size: 2.25rem;
  line-height: 1rem;
  margin: 0;
  text-align: end;
  text-shadow: var(--background-color) 0 0 20px;

  @media (max-width: 655px) {
    font-size: 1.8rem;
    text-align: center;
  }

  @media (max-width: 550px) {
    font-size: 1.6rem;
  }

  @media (max-width: 482px) {
    font-size: 1.4rem;
  }

  @media (max-width: 435px) {
    display: none;
  }

  &:hover {
    color: var(--primary-color);
  }
}

.actionButtons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1rem;
}
</style>
