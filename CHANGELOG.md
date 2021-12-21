# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
* Definition of the `icons` property of `AppMetadata`, based on PWA icon spec ([#319](https://github.com/finos/FDC3/pull/319))
* Added support for raiseIntent without a context via the addition of the `fdc3.nothing` context type ([#375](https://github.com/finos/FDC3/pull/375))
* Added [**FDC3 Workbench**](https://fdc3.finos.org/toolbox/fdc3-workbench/), an FDC3 API developer application ([#457](https://github.com/finos/FDC3/pull/457))
* Added advice on how to `broadcast` complex context types, composed of other types, so that other apps can listen for both the complex type and simpler constituent types ([#464](https://github.com/finos/FDC3/pull/464))
* `IntentResolution` now requires the name of the intent raised to included, allowing it to be used to determine the intent raised via `fdc3.raiseIntentForContext()`. ([#507](https://github.com/finos/FDC3/pull/507))

### Changed
* Consolidated `Listener` documentation with other types ([#404](https://github.com/finos/FDC3/pull/404))
* Updated definition of the `Position` context type to support negative (short) positions ([#419](https://github.com/finos/FDC3/pull/419))
* Upgraded web access statements from SHOULD to MUST in the API specification ([#440](https://github.com/finos/FDC3/pull/440))
* Updated copyright notices ([#467](https://github.com/finos/FDC3/pull/467))
* Adjusted wording in API spec and documentation to acknowledge the possibility of methods of intent resolution other than a resolver UI ([#461](https://github.com/finos/FDC3/pull/461))
* Moved the Icon type definition into the Types documentation page for consistency with other types. ([#493](https://github.com/finos/FDC3/pull/493)
* All DesktopAgent and Channel API functions are now async for consistency, changing the return type of the `broadcast`, `addIntentListener`, `addContextListener` and `getInfo` functions ([#516](https://github.com/finos/FDC3/pull/516))

### Deprecated
### Fixed
* Removed trailing slashes from schema references (which break refs for schema parsers) ([#374](https://github.com/finos/FDC3/pull/374))
* Corrected that definition of the `Context` type in documentation ([#406](https://github.com/finos/FDC3/pull/406)])
* Corrected syntax errors in context schema examples ([#424](https://github.com/finos/FDC3/pull/424))
* Corrected a minor error in the ViewQuote Intent example ([#439](https://github.com/finos/FDC3/pull/439))
* Clarified behavior of `fdc3.addContextListener` when not joined to a channel ([#449](https://github.com/finos/FDC3/pull/449))
* Clarified existing behavior of `joinChannel` and `addIntentListener` when joining a channel ([#454](https://github.com/finos/FDC3/pull/454))
* Clarified numerous aspects of the existing `raiseIntent` behavior in the spec and documentation ([#461](https://github.com/finos/FDC3/pull/461))
* Updated Methods.ts to support the updated signature for `addContextListener` introduced in FDC3 1.2 ([#462](https://github.com/finos/FDC3/pull/462))
* Clarified that implementing `fdc3.getInfo()` is required for compliance with the FDC3 standard ([#515](https://github.com/finos/FDC3/pull/515))


## [npm v1.2.0] - 2021-04-19

### Added
* ES6 functions for `getInfo()` and `raiseIntentForContext()` ([#268](https://github.com/finos/FDC3/pull/268), [#324](https://github.com/finos/FDC3/pull/324))
* `fdc3Ready()` utility function that wraps checks for the window.fdc3 global object and new `fdc3Ready` event ([#360](https://github.com/finos/FDC3/pull/360))
* `compareVersionNumbers()` and `versionIsAtLeast()` utility functions to complement `getInfo()` ([#324](https://github.com/finos/FDC3/pull/324))

### Changed
* `addContextListener(contextType, handler)` now supports passing `null` as the context type ([#329](https://github.com/finos/FDC3/pull/329))
* All other API type changes and additions from the [FDC3 Standard 1.2](https://github.com/finos/FDC3/releases/tag/v1.2) release

### Deprecated
* `addContextListener(handler)` ([#329](https://github.com/finos/FDC3/pull/329))
* `IntentResolution.data` ([#341](https://github.com/finos/FDC3/pull/341))

## [FDC3 Standard 1.2] - 2021-04-19
### Added
* New `raiseIntentForContext()` method ([#268](https://github.com/finos/FDC3/pull/268))
* New `fdc3Ready` event ([#269](https://github.com/finos/FDC3/pull/269))
* New `getInfo()` method that returns implementation metadata ([#324](https://github.com/finos/FDC3/pull/324))

### Changed
* `fdc3.open()` and `fdc3.raiseIntent()` now takes `TargetApp`, which resolves to `string | AppMetadata` ([#272](https://github.com/finos/FDC3/pull/272))
* `AppMetadata` return type can now optionally include `appId` and `version` ([#273](https://github.com/finos/FDC3/pull/273))
* `addContextListener(contextType, handler)` now supports passing `null` as the context type ([#329](https://github.com/finos/FDC3/pull/329))
* Simplify API reference documentation and add info about supported platforms, including npm package ([#349](https://github.com/finos/FDC3/pull/349))

### Deprecated
* `addContextListener(handler)` ([#329](https://github.com/finos/FDC3/pull/329))
* `IntentResolution.data` and `'global'` channel concept ([#341](https://github.com/finos/FDC3/pull/341))

### Fixed
* Return type of `getCurrentChannel()` should be `Promise<Channel | null>` ([#282](https://github.com/finos/FDC3/pull/282))
* `leaveCurrentChannel()` is missing from `DesktopAgent` interface ([#283](https://github.com/finos/FDC3/pull/283))

## [npm v1.1.1] - 2021-04-15
### Fixed
* `Intents` enum should contain `StartChat` not `StartChart` ([#364](https://github.com/finos/FDC3/pull/364))

### Fixed
* Return type of `getCurrentChannel()` should be `Promise<Channel | null>` ([#282](https://github.com/finos/FDC3/pull/282))
* Missing `leaveCurrentChannel()` export ([#283](https://github.com/finos/FDC3/pull/283))

## [npm v1.1.0] - 2021-04-14
### Added
* Build an npm package with exported TypeScript typings for API, Context Data and `window.fdc3` global ([#252](https://github.com/finos/FDC3/pull/252))
* Export helper enums for names of standardised `Intents` and `ContextTypes` ([#264](https://github.com/finos/FDC3/pull/264))
* Export API operations as ES6 functions that can be directly imported ([#266](https://github.com/finos/FDC3/pull/266))
* Check for the existence of `window.fdc3` in ES6 functions, and reject or throw if not defined ([#356](https://github.com/finos/FDC3/pull/356))

### Fixed
* Return type of `getCurrentChannel()` should be `Promise<Channel>` ([#222](https://github.com/finos/FDC3/pull/222))

## [FDC3 Standard 1.1] - 2020-04-09
### Added
* JSON Schema definitions for agreed context types ([#119](https://github.com/finos/FDC3/pull/119)):
    - `fdc3.context`
    - `fdc3.instrument`
    - `fdc3.instrumentList`
    - `fdc3.contact`
    - `fdc3.contactList`
    - `fdc3.organization`
    - `fdc3.country`
    - `fdc3.position`
    - `fdc3.portfolio`
* API entry point for web - `window.fdc3` ([#139](https://github.com/finos/FDC3/pull/139))
* Use Case 17 ([#153](https://github.com/finos/FDC3/pull/153))
* Channels API ([#154](https://github.com/finos/FDC3/pull/154)):
    - `fdc3.getSystemChannels`
    - `fdc3.getOrCreateChannel`
    - `fdc3.joinChannel`
    - `fdc3.leaveCurrentChannel`
    - `fdc3.getCurrentChannel`
    - `Channel` interface
    - `DisplayMetadata` interface
    - `ChannelError` type
* Type filtering support for `getCurrentContext` ([#161](https://github.com/finos/FDC3/pull/161))
* Publish versioned JSON schemas to FDC3 website ([#170](https://github.com/finos/FDC3/pull/170))
* Intent Reference and Context Data Reference documentation ([#172](https://github.com/finos/FDC3/pull/172))

### Changed
* Remove FactSet-specific examples from docs ([#88](https://github.com/finos/FDC3/pull/88))
* Apply FINOS branding, styles and logos to the website ([#96](https://github.com/finos/FDC3/pull/96))
* Include ChartIQ in "Who is using FDC3?" section on website ([#100](https://github.com/finos/FDC3/pull/100))
* Expand `AppMetadata` interface with more application properties ([#157](https://github.com/finos/FDC3/pull/157))
* Restructure some docs ([#190](https://github.com/finos/FDC3/pull/190))

### Fixed
* Several typos and broken links in docs
* Various security vulnerabilities

## [FDC3 Standard 1.0] - 2019-03-28
### Added
* Documentation website (generated with [Docusaurus]) and content from old separate FDC3 repos ([#5](https://github.com/finos/FDC3/pull/5)):
  - [FDC3/API](https://github.com/FDC3/API)
  - [FDC3/ContextData](https://github.com/FDC3/ContextData)
  - [FDC3/Intents](https://github.com/FDC3/Intents)
  - [FDC3/appd-api](https://github.com/FDC3/appd-api)
  - [FDC3/use-cases](https://github.com/FDC3/use-cases)
* Use Case 15 ([#49](https://github.com/finos/FDC3/pull/49))
* FDC3 Roadmap ([#55](https://github.com/finos/FDC3/pull/55))
* FDC3 feature icons on website landing page ([#57](https://github.com/finos/FDC3/pull/57))
* Participant showcase on website landing page ([#67](https://github.com/finos/FDC3/pull/67))

[Docusaurus]: https://docusaurus.io

### Changed
* General cleanup of spelling, grammar and punctuation ([#34](https://github.com/finos/FDC3/pull/34))
* Use cases callout on website landing page ([#54](https://github.com/finos/FDC3/pull/54))
* Proofreading of docs ([#62](https://github.com/finos/FDC3/pull/62))

### Fixed
* Remove unnecessary dates from use case file names ([#41](https://github.com/finos/FDC3/pull/41))
* Header colouring on responsive website ([#56](https://github.com/finos/FDC3/pull/56))
* Workflow numbers in Use Case 1 ([#60](https://github.com/finos/FDC3/pull/60))
* Examples in Intent Overview ([#65](https://github.com/finos/FDC3/pull/65))
* Errors in DesktopAgent API Reference ([#66](https://github.com/finos/FDC3/pull/66))

[Unreleased]: https://github.com/finos/FDC3/compare/v1.2..HEAD
[npm v1.2.0]: https://github.com/finos/FDC3/compare/v1.1.0..v1.2.0
[FDC3 Standard 1.2]: https://github.com/finos/FDC3/compare/v1.2..v1.1
[npm v1.1.1]: https://github.com/finos/FDC3/compare/v1.1.0..v1.1.1
[npm v1.1.0]: https://github.com/finos/FDC3/compare/v1.1..v1.1.0
[FDC3 Standard 1.1]: https://github.com/finos/FDC3/compare/v1.1..v1.0
[FDC3 Standard 1.0]: https://github.com/finos/FDC3/v1.0
