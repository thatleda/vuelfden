<template>
  <nav>
    <link-button to="/">
      <wolf mirror height="5rem" width="5rem" />
    </link-button>
    <link-button to="/#who" text="Who?" />
    <link-button to="/#previously" text="Previously" />
    <link-button to="/ramblings" text="Blog" />
    <link-button to="/#testimonials" text="Working with Leda" />
    <link-button to="/#contact" text="Contact" />
    <link-button
      text="CV"
      variant="primary"
      to="resume.pdf"
      target="_blank"
      download="resume.pdf"
    />
  </nav>
  <NuxtPage />
</template>

<script setup>
import LinkButton from "~/components/base/link-button.vue";
import wolf from "~/components/svg/wolf.vue";
</script>

<style module>
body {
  font-size: 18px;
  font-weight: 300;
  font-family: var(--base-font);
  text-rendering: optimizeLegibility;
  color: var(--text-color);
  @media (max-width: 749px) {
    font-size: 12px;
  }

  @media (max-width: 1030px) {
    font-size: 16px;
  }
}

a {
  text-decoration: none;
  text-decoration-skip-ink: auto;
  color: var(--subtext-color);
  cursor: pointer;

  &:hover {
    outline: 0;
  }

  &:focus {
    outline-color: var(--subtext-color);
    outline-style: dotted;
    outline-width: 2px;
  }
}

svg {
  fill: var(--text-color);
}

h1 {
  font-family: "Silkscreen", sans-serif;
  font-size: 2.5rem;
}

h2 {
  font-family: "Homemade Apple", cursive;
}

h3 {
  text-transform: uppercase;
}

em {
  font-family: "Homemade Apple", cursive;
  font-style: normal;
  margin: 0 0.25rem;
  line-height: 0.8rem;
  font-size: 1.1rem;
}

q {
  font-style: italic;
  color: var(--primary-color);
}

u {
  text-decoration: none;
  box-shadow: inset 0 -0.7em 0 var(--secondary-color);
  transition: box-shadow 0.3s ease-out;
  &:hover {
    box-shadow: inset 0 -1.5em 0 var(--secondary-color);
  }
}

nav {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--page-width);
  padding: var(--page-padding);
  width: 100%;

  @media (max-width: 1030px) {
    padding-left: 0;
  }

  svg:hover {
    fill: var(--primary-color);
  }
}
</style>
