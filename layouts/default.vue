<template>
  <nav>
    <NuxtLink to="/#who">Who?</NuxtLink>
    <NuxtLink to="/#previously">Previously</NuxtLink>
    <NuxtLink to="/ramblings">Blog</NuxtLink>
    <NuxtLink to="/#testimonials">Working with Leda</NuxtLink>
    <NuxtLink to="/#contact">Contact</NuxtLink>
  </nav>
  <NuxtPage />
</template>

<style module>
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
