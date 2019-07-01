# Assemblage

[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## About

This monorepo is implemented using [Lerna](https://github.com/lerna/lerna), a tool for managing JavaScript projects with multiple packages.

## Getting Started

```sh
npm install
npm start
```

## Useful Commands

### Link components

`npx lerna link`

### Compile all components

`npx lerna run build`

or

`npx lerna exec tsc`

or

`npx tsc -b $(find components -type d -mindepth 1 -maxdepth 1)`

or

`(cd components/<PACKAGE>; npx -p typescript tsc)`

#### Watch mode

`npx tsc -b $(find components -type d -mindepth 1 -maxdepth 1) --watch`

### Compile a component

`npx lerna run build --scope=@assemblage/<PACKAGE>`

or

`npx tsc -b components/awc-base`

#### Passing arguments

As lerna run first calls `npm run`, it is necessary to pass -- twice in order to pass arguments to the npm script itself. This is necessary to preserve the ability to pass flags to npm or yarn.

`npx lerna run build --scope=@assemblage/<PACKAGE> -- -- --foo=bar`

This doesn't work as Docker cannot traverse symlinks, which is how the various Niveau modules are included as dependencies.
