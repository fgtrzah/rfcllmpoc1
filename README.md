#### Overview

This is the front end for 1) browsing RFC documents with a context menu and a ietf datatracker api proxy
2) a baseline llm driven QA platform that uses basic prompt engineering.

#### Development

- depends on backend counterpart which isn't finished clearing vulnerability scans

#### Example of QA

![qa](https://github.com/fgtrzah/rfcllmpoc1/blob/main/demo.gif?raw=true)

#### Example of proxy datatracker search

![search](https://github.com/fgtrzah/rfcllmpoc1/blob/main/demo-search.gif?raw=true)

#### Usual setup and local development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



Tentative roadmap
- sqlite ec2 for warehousing all QA that
  - link github issued uid and all questions and responses asked
    by the user
  - emphasis on stowing and doing so in journaled fashion for
    future use (will cross that bridge later)

