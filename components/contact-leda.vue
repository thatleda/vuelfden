<template>
  <div :class="$style.card">
    <p>
      If you have developed a strong desire to communicate or collaborate,
      please don't hesitate and write to:
    </p>
    <div :class="$style.profile">
      <svg-mail height="5rem" width="5rem" />
      <div :class="$style.contactData">
        <div :class="$style.name">
          <u>Leda Wolf</u>
        </div>
        <NuxtLink to="mailto:leda@hey.com">
          leda@hey.com
        </NuxtLink>
      </div>
    </div>
    <base-transition-animation
      :class="$style.actionButtons"
      animation-name="fade-left"
      animation-duration="600ms"
    >
      <base-link-button
        to="https://discord.com/users/732667625255075951"
        variant="secondary"
      >
        <svg-discord />Discord
      </base-link-button>
      <base-link-button
        to="https://github.com/thatleda"
        variant="secondary"
      >
        <svg-github />GitHub
      </base-link-button>
      <base-link-button
        to="https://www.linkedin.com/in/thatleda/"
        variant="secondary"
      >
        <svg-linkedin />LinkedIn
      </base-link-button>
    </base-transition-animation>
  </div>
</template>

<style module>
.card {
  display: flex;
  flex-direction: column;
  background: var(--surface-primary);
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
