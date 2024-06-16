// @vitest-environment nuxt

import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import { expect, test } from "vitest";

import LinkButton from "./link-button.vue";

test("should render external link as a button", async () => {
  await renderSuspended(LinkButton, {
    props: {
      target: "_blank",
      text: "Google it!",
      to: "https://google.com",
    },
  });

  expect(screen.getByRole("link")).toHaveAccessibleName("Google it!");
  expect(screen.getByRole("link")).toHaveAttribute(
    "rel",
    "noopener noreferrer",
  );
  expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  expect(screen.getByRole("link")).toHaveClass("button");
});

// TODO: NuxtLink swallows slots for some odd reason
test.skip("should pass an svg", async () => {
  await renderSuspended(LinkButton, {
    props: {
      target: "_blank",
      text: "GitHub",
      to: "https://github.com",
    },
    slots: {
      icon: () =>
        `<svg width="10" height="10" viewBox="0 -960 960 960"><title>GitHub icon</title><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>`,
    },
  });

  expect(screen.getByTitle("GitHub icon")).toBeInTheDocument();
});

test("should add the right class to the primary button", async () => {
  await renderSuspended(LinkButton, {
    props: {
      target: "_blank",
      text: "Google it!",
      to: "https://google.com",
      variant: "primary",
    },
  });

  expect(screen.getByRole("link")).toHaveClass("button", "secondary");
});

test("should add the right class to the secondary button", async () => {
  await renderSuspended(LinkButton, {
    props: {
      target: "_blank",
      text: "Google it!",
      to: "https://google.com",
      variant: "secondary",
    },
  });

  expect(screen.getByRole("link")).toHaveClass("button", "secondary");
});

test("should add the custom class", async () => {
  await renderSuspended(LinkButton, {
    props: {
      class: "customClass",
      target: "_blank",
      text: "Google it!",
      to: "https://google.com",
      variant: "secondary",
    },
  });

  expect(screen.getByRole("link")).toHaveClass(
    "button",
    "secondary",
    "customClass",
  );
});
