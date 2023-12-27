/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-indexed-object-style": "warn",
    "@typescript-eslint/consistent-type-assertions": [
      "warn",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "allow-as-parameter",
      },
    ],
    "@typescript-eslint/no-unsafe-call": "warn",
"@typescript-eslint/no-unsafe-assignment": "warn",
"@typescript-eslint/non-nullable-type-assertion-style": "warn",
"@typescript-eslint/no-unsafe-member-access": "warn",
"@typescript-eslint/no-unsafe-return": "warn",
"@typescript-eslint/no-unnecessary-type-constraint": "warn",
"@typescript-eslint/no-unnecessary-type-arguments": "warn",
"@typescript-eslint/no-unnecessary-type-assertion": "warn",
"@typescript-eslint/no-unsafe-argument": "warn",
"@typescript-eslint/prefer-enum-initializers": "warn",
"@typescript-eslint/prefer-for-of": "warn",
"@typescript-eslint/prefer-function-type": "warn",
"@typescript-eslint/prefer-includes": "warn",
"@typescript-eslint/prefer-literal-enum-member": "warn",
"@typescript-eslint/prefer-nullish-coalescing": "warn",
"@typescript-eslint/prefer-optional-chain": "warn",
"@typescript-eslint/prefer-readonly": "warn",
"@typescript-eslint/prefer-reduce-type-parameter": "warn",
"@typescript-eslint/prefer-string-starts-ends-with": "warn",
"@typescript-eslint/prefer-ts-expect-error": "warn",
"@typescript-eslint/promise-function-async": "warn",
"@typescript-eslint/require-array-sort-compare": "warn",
"@typescript-eslint/restrict-plus-operands": "warn",
"@typescript-eslint/no-explicit-any": "warn",
"@typescript-eslint/ban-ts-comment": "warn",
"@typescript-eslint/no-empty-function": "warn",
"@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "warn",
      {
        checksVoidReturn: { attributes: false },
      },
    ],
  },
};

module.exports = config;
