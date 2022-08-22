# vue3-list-experiment

Experiment project to test a couple of thing around vue.js@3:

1. https://vuejs.org/guide/best-practices/performance.html#avoid-unnecessary-component-abstractions by rendering a collection of information of 250 countries retrieved from https://restcountries.com/v2/all.
2. Learn a little bit about tailwindcss@3.
3. Use https://developer.mozilla.org/en-US/docs/Web/API/Performance.
4. Learn a little about https://vuejs.org/guide/essentials/component-basics.html#dynamic-components.

The repo should be available at:

- https://github.com/unjapones/vue3-list-experiment
- https://gitlab.com/jorgeshirai/vue3-list-experiment (because I'm checking it out of curiosity 🤓)

## Conclusions (so far)

It looks like the measured update times and, if the UI experiences "little-freezes", varies depending on:

- Testing the UI with Vue's dev-tools activated or not.
- Testing the UI in development mode or the final build.

Open questions:

- Is `filtereCountries` (`countries` store) implemented the best-possible way?
- Is the filter + `class` binding the best approach?

### TODO

- Set max in number input based on max population from countries.
- Check how a virtualized vue component works ("Virtualize Large Lists" from vue's docs).
- ~~Dark mode.~~
- ~~Add basic e2e test.~~
- ~~Unit tests.~~

## Project Setup (create-vue based)

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

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
