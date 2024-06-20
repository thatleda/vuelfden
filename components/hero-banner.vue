<template>
  <page-section :animation-props="{ animationDuration: '0ms' }">
    <div :class="$style.card">
      <sanity-image
        :asset-id="page.banner.asset._ref"
        alt="Leda Wolf"
        w="200"
        h="200"
        fit="crop"
        crop="center"
        :class="$style.photo"
      />
      <div :class="$style.callToAction">
        <h1 :class="$style.greeting">{{ page.title }}</h1>
        <h1 :class="$style.introduction">I'm a software engineer</h1>
        <h2 :class="$style.purpose">
          Let's see if I'm a <u>good fit</u> for your company.
        </h2>
        <sanity-block :blocks="page.content" />
        <transition-animation
          animation-duration="2s"
          animation-name="fade-left"
          :class="$style.actionButtons"
        >
          <link-button
            to="https://discord.com/users/732667625255075951"
            text="Discord"
            variant="secondary"
          />
          <link-button
            to="https://github.com/thatleda"
            text="GitHub"
            variant="secondary"
          />
          <link-button
            to="https://www.linkedin.com/in/thatleda/"
            text="LinkedIn"
            variant="secondary"
          />
          <link-button
            to="mailto:leda@hey.com"
            text="Mail"
            variant="secondary"
          />
          <link-button
            to="https://calendly.com/ledawolf/meeting"
            text="Calendly"
            variant="primary"
          />
        </transition-animation>
      </div>
    </div>
  </page-section>
</template>

<script lang="ts" setup>
import type { SanityPage } from "~/@types";

import LinkButton from "~/components/base/link-button.vue";
import PageSection from "~/components/base/page-section.vue";
import SanityBlock from "~/components/base/sanity-block.vue";
import TransitionAnimation from "~/components/base/transition-animation.vue";

interface HeroProps {
  page: SanityPage;
}

const { page } = defineProps<HeroProps>();
</script>

<style module>
.card {
  display: flex;
  flex-direction: row;
  gap: 5rem;
  align-items: center;
  background-color: var(--card-background-color);
  border-radius: var(--border-radius);
  padding: 1rem;

  @media (max-width: 1015px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0;
  }
}

.photo {
  border-radius: 100%;
}

.callToAction {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 30vh;
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
  font-size: 2.625rem;
  line-height: 3rem;
  margin-bottom: 0;
  line-break: unset;
  text-shadow: var(--secondary-color) 1px 0 10px;
}

.purpose {
  font-size: 1.5rem;
  line-height: 1rem;
  margin: 0;
  text-align: end;
  text-shadow: var(--background-color) 0 0 20px;

  @media (max-width: 749px) {
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
