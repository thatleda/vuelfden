<template>
  <footer :class="$style.footer">
    <div :class="$style.linkWrapper">
      <base-link-button
        aria-label="Nuxt"
        to="https://nuxt.com/"
        target="_blank"
        text="-powered vanity"
      >
        <template #icon>
          <svg-nuxt-logo width="1rem" height="1rem" fill="var(--text-color)" />
        </template>
      </base-link-button>
      <nav :class="$style.footerNav">
        <base-link-button to="/privacy" text="Privacy" />
        <base-link-button to="/imprint" text="Imprint" />
      </nav>
    </div>
  </footer>
</template>

<style module>
.footer {
  background: var(--background-color);
  border-top: 3px solid var(--box-shadow-color);
}

.footerNav {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding-bottom: 0;
}

.linkWrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  font-size: 0.85rem;
  max-width: var(--page-width);
  padding: var(--page-padding);
}
</style>
