# @mfbtech/changelog-generator

A changelog generator not authored by git data but by the developer implementing the fix, feature, breaking change, ...

This package helps developers manage changelogs and package version while keeping their freedom to put what ever they want in their commit messages, tags, ....

## Usage

The general workflow of a developer would be something like,

1. Branch off of the main development branch of the repository.
1. Commit changes and, before making a pull request, run `ccg change` to generate a change file.
1. Create a pull requests and merge the changes. `ccg change --verify` can be run in CI/CD to verify that a change file has been generated.
1. When publishing the package, run `ccg publish` to bump the package.json version and update the changelog file with all of the change files.

Change files contain date/time, a short description of the change and an associated version bump for the change (i.e. major, minor or patch).

TODO: add links to CLI docs

## Scripts

- `build`: Builds the CLI.
- `lint`: Fixes all lint errors.
- `check-linting`: Checks for lint errors without fixing them.
- `format`: Fixes all format errors.
- `check-formatting`: Checks for format errors without fixing them.
- `test`: Runs all tests and re-runs them when changes are made.
- `test:ci`: Runs all tests, generates a test coverage report and exits.

## Changelog

TODO:link to changelog

## Development Environment

[Clone repo into container volume.](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/lemke-ethan/changelog-generator.git)

[Cline init-source branch into container volume](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/lemke-ethan/changelog-generator/tree/init-source)

## Publishing

TODO
