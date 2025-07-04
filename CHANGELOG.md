# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.2] - 2025-07-04

### Added

### Changed
 
### Fixed

- Fix the admin page so it displays the account label and can successfully edit them.  

## [1.0.1] - 2025-07-03

### Added

- "Lock now" button in the settings page within the Auto-lock options.
- This `CHANGELOG.md` file.

### Changed

### Fixed

- Fix to allow secret keys that are not strict `base32` standard (character number multiple of 8).
- Fixed settings icon CSS, button was too big, specially in mobile view.

## [1.0.0] - 2025-07-02

Note: this change introduces a new field in the Tokens table within the D1 database and requires a schema update.

### Added

### Changed

- Modified Tokens table schema by adding the field `Label` (TEXT).
- Upgraded package dependencies to the latest versions.
- Enhanced `.gitignore` to exclude `package-lock.json` and removed file from repository.
- Expanded documentation with details on how to add the main user to the database in the `Sessions` Table.

### Fixed

- Fix to allow secret keys to be entered with characters in lower case, doing the upper case automatically when generating TOTP codes.
- Fixed the backend code that adds and updates manual entries; when entering Issuer, Account and Secret values, the Account (`token.Label`) was not being added.
