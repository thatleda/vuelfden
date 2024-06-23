<template>
  <footer :class="$style.footer">
    <div :class="$style.linkWrapper">
      <base-link-button
        aria-label="Nuxt"
        to="https://nuxt.com/"
        target="_blank"
      >
        <span :class="$style.powered">
          <svg-nuxt-logo fill="var(--text-color)" />-powered vanity
        </span>
      </base-link-button>
      <nav :class="$style.footerNav">
        <base-link-button to="/privacy">
          Privacy
        </base-link-button>
        <base-link-button to="/imprint">
          Imprint
        </base-link-button>
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
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: var(--page-width);
  padding: var(--page-padding);
}
</style>
