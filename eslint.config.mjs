import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      ".next/**",
      ".pagefind-tmp/**",
      "node_modules/**",
      "public/pagefind/**",
    ],
  },
  ...nextVitals,
];

export default config;
