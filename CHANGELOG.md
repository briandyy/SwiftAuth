# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [1.0.1] - 2025-07-03
  
### Added

- "Lock now" button in the settings page within the Auto-lock options.
- This `CHANGELOG.md` file.

### Changed
 
### Fixed

- Fix to allow secret keys that are not strict base32 standard (character number multiple of 8)
- Fixed settings icon CSS, button was too big, specially in mobile view.

 
## [1.0.0] - 2025-07-02
 
Note this change introduces a new field in the Tokens table within the D1 database and requires a Schema update.

### Added
   
### Changed
 
- Changed Tokens table shema adding the Label (TEXT) field.
- Updated Package dependencies with the latests versions.
- Updated `.gitignore` to not track `package-lock.json` and deleted file from git.
- Updated documentation with details on how to add the main user to the database.

### Fixed

- Fix to allow secret keys to be entered with characters in lower case, doing the upper case automatically when generating tokens.
- Fix the backend code that adds and updates manual entries, when entering Issuer, Account and Secret values the Account (token.Label) was not added.
