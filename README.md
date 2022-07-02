# eslint-plugin-nuxt3-auto-import

A plugin that adds ESLint globals for nuxt3 auto imported functions.

## Introduction
In [nuxt@3.0.0-rc.4](https://github.com/nuxt/framework/tree/v3.0.0-rc.4), nuxt would [auto import](https://v3.nuxtjs.org/guide/concepts/auto-imports/) helper functions, composables and Vue APIs to use across your application without explicitly importing them. However, we need to add globals to the configuration file in order to avoid the ESLint [no-undef](https://eslint.org/docs/latest/rules/no-undef) rule.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-nuxt3-auto-import` by using the url (since I didn't publish this plugin):

```sh
npm install --save-dev git+https://github.com/LuckyWindsck/eslint-plugin-nuxt3-auto-import.git
```

Or if you prefer using ssh:

```sh
npm install --save-dev git+ssh://git@github.com/LuckyWindsck/eslint-plugin-nuxt3-auto-import.git
```

## Usage

Add `"nuxt3-auto-import"` to the plugins section and add to `"nuxt3-auto-import/nuxt": true` to the env section of your `.eslintrc` configuration file.

```javascript
{
    "plugins": [
        ...,
        "nuxt3-auto-import"
    ]
    "env": {
        ...,
        "nuxt3-auto-import/nuxt": true
    },
}
```

## Development
- Clone repository
- Install dependencies
- Run `npm run generate-globals` to automatically generate globals from `nuxt` source code.

## Related Issues/Discussion
### Issues
- nuxt/eslint-plugin-nuxt#173: nuxt/eslint-plugin-nuxt vs nuxt/eslint-config and nuxt3 globals
### Discussion
- nuxt/framework#2007: About bridge with Eslint and AutoImport
