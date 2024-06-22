<template>
  <div :class="$style.card">
    <p>
      If you have developed a strong desire to communicate or collaborate,
      please don't hesitate and write to:
    </p>
    <div :class="$style.profile">
      <mail height="5rem" width="5rem" />
      <div :class="$style.contactData">
        <div :class="$style.name">
          <u>Leda Wolf</u>
        </div>
        <NuxtLink to="mailto:leda@hey.com">
          leda@hey.com
        </NuxtLink>
      </div>
    </div>
    <transition-animation
      :class="$style.actionButtons"
      animation-name="fade-left"
      animation-duration="600ms"
    >
      <link-button
        to="https://discord.com/users/732667625255075951"
        text="Discord"
        variant="secondary"
      >
        <template #icon>
          <discord />
        </template>
      </link-button>
      <link-button
        to="https://github.com/thatleda"
        text="GitHub"
        variant="secondary"
      >
        <template #icon>
          <github />
        </template>
      </link-button>
      <link-button
        to="https://www.linkedin.com/in/thatleda/"
        text="LinkedIn"
        variant="secondary"
      >
        <template #icon>
          <linkedin />
        </template>
      </link-button>
    </transition-animation>
  </div>
</template>

<script lang="ts" setup>
import Mail from '~/components/svg/mail.vue'
import LinkButton from '~/components/base/link-button.vue'
import TransitionAnimation from '~/components/base/transition-animation.vue'
import Discord from '~/components/svg/discord.vue'
import Github from '~/components/svg/github.vue'
import Linkedin from '~/components/svg/linkedin.vue'
</script>

<style module>
.card {
  display: flex;
  flex-direction: column;
  background-color: var(--card-background-color);
  border-radius: var(--border-radius);
  padding: 1rem;
}

.actionButtons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.name {
  font-weight: 800;
}

.contactData {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.125rem;
  line-height: 2rem;
}
</style>
