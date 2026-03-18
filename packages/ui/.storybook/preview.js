/** @type { import('@storybook/react').Preview } */
import "../src/styles.js";

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#fafbfc",
        },
        {
          name: "dark",
          value: "#1f2937",
        },
        {
          name: "white",
          value: "#ffffff",
        },
      ],
    },
  },
};

export default preview;
