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

    "@typescript-eslint/consistent-indexed-object-style": "off",
    "@typescript-eslint/consistent-type-assertions": [
      "warn",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "allow-as-parameter",
      },
    ],
    "@typescript-eslint/no-unsafe-call": "off",
"@typescript-eslint/no-unsafe-assignment": "off",
"@typescript-eslint/consistent-type-imports": "off",
"@typescript-eslint/dot-notation": "off",
"@typescript-eslint/non-nullable-type-assertion-style": "off",
"@typescript-eslint/no-unsafe-member-access": "off",
"@typescript-eslint/no-unsafe-return": "off",
"@typescript-eslint/no-unnecessary-type-constraint": "off",
"@typescript-eslint/no-unnecessary-type-arguments": "off",
"@typescript-eslint/no-unnecessary-type-assertion": "off",
"@typescript-eslint/no-unsafe-argument": "off",
"@typescript-eslint/prefer-enum-initializers": "off",
"@typescript-eslint/prefer-for-of": "off",
"@typescript-eslint/prefer-function-type": "off",
"@typescript-eslint/prefer-includes": "warn",
"@typescript-eslint/prefer-literal-enum-member": "warn",
"@typescript-eslint/prefer-nullish-coalescing": "off",
"@typescript-eslint/prefer-optional-chain": "warn",
"@typescript-eslint/prefer-readonly": "warn",
"@typescript-eslint/prefer-reduce-type-parameter": "warn",
"@typescript-eslint/prefer-string-starts-ends-with": "warn",
"@typescript-eslint/prefer-ts-expect-error": "warn",
"@typescript-eslint/promise-function-async": "warn",
"@typescript-eslint/require-array-sort-compare": "warn",
"@typescript-eslint/restrict-plus-operands": "warn",
"@typescript-eslint/no-explicit-any": "off",
"@typescript-eslint/ban-ts-comment": "off",
"@typescript-eslint/no-empty-function": "warn",

"@typescript-eslint/prefer-ts-expect-error":"off",
"@typescript-eslint/no-var-requires":"off",
"@typescript-eslint/no-empty-interface": "warn",
    // "@typescript-eslint/consistent-type-imports": [
    //   "warn",
    //   {
    //     prefer: "type-imports",
    //     fixStyle: "inline-type-imports",
    //   },
    // ],
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
