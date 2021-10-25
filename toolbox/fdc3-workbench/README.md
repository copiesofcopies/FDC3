# <a href='http://fdc3.finos.org'><img src='https://fdc3.finos.org/img/fdc3-logo-2019-color.png' height='150' alt='FDC3 Logo' aria-label='fdc3.finos.org' /></a>

# FDC3 Workbench
When developing interoperability for your application with other apps on a Financial services desktop, using the [FDC3 standard](https://fdc3.finos.org/docs/fdc3-intro), the first step is often to develop a test harness or workbench tool with which to exchange messaging. The FDC3 Workbench is designed to provide that tooling so that you can focus on implementing FDC3 support in your application.

_Created and contributed to [FDC3](http://fdc3.finos.org) by [Cosaic, Inc.](https://cosaic.io/) in 2021._

## Getting Started

1. Clone the repository

`git clone https://github.com/ChartIQ/fdc3-workbench`

2. Install dependencies

`cd fdc3-workbench & yarn install`

3. Start the development server

`yarn start`

4. Add the URL http://localhost:3000 to your FDC3-enabled container or desktop agent and ensure it has access to the `window.fdc3` object.

## TODO
- Implement a panel for working with [App channels](https://fdc3.finos.org/docs/api/spec#direct-listening-and-broadcast-on-channels).
- Implement `findIntent` in the intents panel with support for a targetted `raiseIntent` using one of the results.
- Add support for saving context tempaltes across sessions (e.g. via localstorage)
## Packages

Core:
- [Create React App](https://github.com/facebook/create-react-app) - with TypeScript
- [MATERIAL-UI](https://material-ui.com) - v4
- [MobX](https://mobx.js.org/README.html) - state management

Also using Eslint, Husky and Prettier please configure your IDE to work properly with code style rules.

Minor:
- [JsonEditor](https://github.com/josdejong/jsoneditor) - lib to add json editor field with json schema validation
- [nanoid](https://www.npmjs.com/package/nanoid) - A tiny, secure, URL-friendly, unique string ID generator for JavaScript.

## Known Issues

- The following console error may appear periodically: `Warning: findDOMNode is deprecated in StrictMode.`, this is a [well-known issue in material-ui](https://github.com/mui-org/material-ui/issues/13394) and will be fixed in v5, which (at the time of writing) is currently in beta.



