# checklevel

This template should help get you started developing with Vue 3 in Vite.

## Tech Stack

- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type-safe JavaScript
- **Vue Router** - Official routing library
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **ESLint + Prettier** - Code quality and formatting

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Tailwind CSS

Tailwind CSS is fully integrated and ready to use. You can use Tailwind utility classes directly in your Vue components:

```vue
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <button class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
      Click me
    </button>
  </div>
</template>
```

To customize Tailwind, edit the `tailwind.config.js` file.
