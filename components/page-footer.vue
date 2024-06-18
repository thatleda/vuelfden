<template>
  <footer :class="$style.footer">
    <div :class="$style.linkWrapper">
      <NuxtLink aria-label="home" to="/#who">
        <wolf v-if="smallScreen" mirror height="5rem" width="5rem" />
        <div v-else :class="$style.logo">Leda Wolf</div>
      </NuxtLink>
      <nav :class="$style.footerNav">
        <link-button to="/privacy" text="Privacy" />
        <link-button to="/imprint" text="Imprint" />
      </nav>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import LinkButton from "~/components/base/link-button.vue";
import Wolf from "~/components/svg/wolf.vue";

const smallScreen = useMediaQuery("(max-width: 1030px)");
</script>

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

.logo {
  font-family: "Homemade Apple", cursive;
  min-width: 10rem;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.linkWrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: var(--page-width);
  padding: var(--page-padding);
}
</style>
