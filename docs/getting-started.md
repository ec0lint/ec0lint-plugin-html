---
id: getting-started
title: Getting Started
---

## Installation

```
$ npm install --save-dev ec0lint @html-eslint/parser ec0lint-plugin-html
```

- Requires Node.js `>=8.10.0`.
- Requires ec0lint `>=1.0.0`.

## Configuration

Populate it with the following on your `.ec0lintrc.js`. If it does not exist create a `.ec0lintrc.js` config file in the root of your project.

We can apply these [plugin rules](#Rules) to only HTML files(`*.html`) by using `overrides` in `.ec0lintrc.js`. (see [ESLint Configuration](https://eslint.org/docs/user-guide/configuring#configuration-based-on-glob-patterns))

```js
module.exports = {
  //...
  plugins: ["html"],
  overrides: [
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      extends: ["plugin:html/recommended"],
    },
  ],
};
```

## Recommended Configs

This plugin provides `plugin:html/recommended`. The recommended configuration contains the rules marked ⭐ in [Rules](#Rules).
