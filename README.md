# 🐼 Pendo [![npm version](https://badge.fury.io/js/pendo.svg)](https://badge.fury.io/js/pendo)

> Friendly package dependency resolver for mono-apps (and mono-repos).

- **Easily** manage dependencies for sub-apps within a mono-app
- **Hooks** into `npm` via `postinstall`
- **Automatically** resolves and installs dependencies within sub-apps


## 🔧 Installation

```
npm install --save-dev pendo
```


## 🕹 Usage

### `pendo.json`

Create a `pendo.json` file in the root of your project.

```
/MyApp
  |- src/
  |- package.json
  \- pendo.json
```

Within in, define the sub-packages/sub-apps under `subDirectories`:

```json
{
  "subDirectories": [
    "./__tests__/site/js/App"
  ]
}
```

### Add npm script

Within your main `package.json`, add a script to fire up Pendo (we recommend adding it to your `postinstall`)

```
"scripts": {
  ...
  "postinstall": "pendo"
  ...
},
```

That's it! ✨

When you run the `npm` command that fires Pendo (or if `npm install` autoruns it for you), Pendo will look into your defined sub-directories, resolve your dependcies, and install them for you.


## 📦 Dependencies

Pendo **only** resolves the items found under `dependencies` in your main `package.json` (it ignores `devDependencies`).

Pendo prioritizes dependencies (and their versions) defined in your main `package.json`, but also respects dependencies within your sub-apps' `package.json`.
