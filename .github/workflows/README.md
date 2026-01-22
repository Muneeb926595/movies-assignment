# CI/CD Pipeline Documentation

This directory contains GitHub Actions workflows for Continuous Integration and Continuous Deployment.

## Workflows

### CI Pipeline (`.github/workflows/ci.yml`)

Runs on every pull request and push to main/develop/master branches.

**Jobs:**
1. **lint-and-format**: Checks code formatting (Prettier) and linting (ESLint), plus TypeScript type checking
2. **test**: Runs Jest tests with coverage reporting
3. **build-android**: Optional Android debug build (only when PR has `build-test` label)

### CD Pipeline (`.github/workflows/cd.yml`)

Runs when a new version tag is pushed (e.g., `v1.0.0`).

**Jobs:**
1. **version-and-changelog**: Automatically generates version and CHANGELOG.md
2. **build-android**: Builds and signs Android App Bundle (.aab) and APK
3. **build-ios**: Builds and signs iOS .ipa file
4. **distribute-android-internal**: Distributes to Firebase App Distribution
5. **distribute-ios-internal**: Uploads to TestFlight
6. **deploy-android-store**: Deploys to Google Play Store (only for release tags)
7. **deploy-ios-store**: Deploys to Apple App Store (only for release tags)

## Required Secrets

Configure these secrets in your GitHub repository settings:

### Android
- `ANDROID_KEYSTORE_BASE64`: Base64-encoded keystore file
- `ANDROID_KEYSTORE_PASSWORD`: Keystore password
- `ANDROID_KEY_ALIAS`: Key alias
- `ANDROID_KEY_PASSWORD`: Key password
- `FIREBASE_ANDROID_APP_ID`: Firebase App ID for Android
- `FIREBASE_SERVICE_ACCOUNT`: Firebase service account JSON (base64 encoded)
- `GOOGLE_PLAY_SERVICE_ACCOUNT`: Google Play service account JSON

### iOS
- `APPLE_ID`: Apple ID for App Store Connect
- `APPLE_APP_SPECIFIC_PASSWORD`: App-specific password
- `MATCH_PASSWORD`: Match encryption password
- `MATCH_GIT_BASIC_AUTHORIZATION`: Base64 encoded `user:token` for match git repo

## Usage

### Creating a Release

1. Make your changes and commit them
2. Run `yarn release:prepare` (or `yarn release:patch/minor/major`)
3. Push the tag: `git push --follow-tags`

The CD pipeline will automatically:
- Generate version and changelog
- Build both Android and iOS apps
- Distribute to internal testers
- Deploy to stores (if release tag)

### Testing Builds Locally

- **Android**: `cd android && ./gradlew assembleRelease`
- **iOS**: `cd ios && bundle exec fastlane build`
