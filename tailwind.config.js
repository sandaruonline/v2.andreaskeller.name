const defaultTheme = require("tailwindcss/defaultTheme");
const mdx = require("@mdx-js/mdx");

// copied from https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px) => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;

module.exports = {
  purge: {
    mode: "all",
    content: ["./src/**/*.{js,mdx}", "./next.config.js"],
    options: {
      extractors: [
        {
          extensions: ["mdx"],
          extractor: (content) => {
            content = mdx.sync(content);

            // Capture as liberally as possible, including things like `h-(screen-1.5)`
            const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

            // Capture classes within other delimiters like .block(class="w-1/2") in Pug
            const innerMatches =
              content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) || [];

            return broadMatches.concat(innerMatches);
          },
        },
      ],
    },
  },
  theme: {
    extend: {
      spacing: {
        "9/16": "56.25%",
      },
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        code: {
          green: "#b5f4a5",
          yellow: "#ffe484",
          purple: "#d9a9ff",
          red: "#ff8383",
          blue: "#93ddfd",
          white: "#fff",
        },
      },
      typography: (theme) => ({
        default: {
          css: {
            color: theme("colors.gray.700"),
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.900"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.gray.900"),
            },
            "ol li:before": {
              fontWeight: "600",
              color: theme("colors.gray.500"),
            },
            "ul li:before": {
              backgroundColor: theme("colors.gray.400"),
            },
            code: {
              color: theme("colors.gray.900"),
            },
            a: {
              color: theme("colors.gray.900"),
              textDecoration: "none",
            },
            pre: {
              color: theme("colors.gray.200"),
              backgroundColor: theme("colors.gray.800"),
            },
            ".remark-code-title": {
              color: theme("colors.gray.200"),
              backgroundColor: theme("colors.gray.700"),
              fontSize: em(14, 16),
              lineHeight: round(24 / 14),
              marginTop: em(24, 14),
              borderTopLeftRadius: rem(6),
              borderTopRightRadius: rem(6),
              paddingTop: em(12, 14),
              paddingRight: em(16, 14),
              paddingBottom: em(12, 14),
              paddingLeft: em(16, 14),
            },
            ".remark-code-title + pre": {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              marginTop: 0,
            },
            blockquote: {
              color: theme("colors.gray.900"),
              borderLeftColor: theme("colors.gray.200"),
            },
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/ui"),
    require("@tailwindcss/typography"),
    function ({ addBase, addComponents, theme }) {
      addBase([
        {
          "@font-face": {
            fontFamily: "Inter var",
            fontWeight: "100 900",
            fontStyle: "normal",
            fontNamedInstance: "Regular",
            fontDisplay: "swap",
            src: 'url("/fonts/Inter-roman.var-latin.woff2?3.13") format("woff2")',
          },
        },
        {
          "@font-face": {
            fontFamily: "Inter var",
            fontWeight: "100 900",
            fontStyle: "italic",
            fontNamedInstance: "Italic",
            fontDisplay: "swap",
            src: 'url("/fonts/Inter-italic.var-latin.woff2?3.13") format("woff2")',
          },
        },
      ]);
    },
  ],
};