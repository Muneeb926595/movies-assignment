# CI/CD Setup Guide

This document provides a comprehensive guide for setting up and using the CI/CD pipeline for this React Native project.

## Overview

The CI/CD pipeline is implemented using:
- **GitHub Actions** for orchestration
- **Docker** for Android build environment (Phase 2)
- **Fastlane** for iOS and Android deployment automation
- **standard-version** for semantic versioning and changelog generation

## Phase 1: Initial Implementation (Current)

Currently, both CI and CD pipelines run directly on GitHub Actions runners. This provides a quick setup without external infrastructure.

## Phase 2: CI/CD Offloading (Future)

Once stable, we'll transition to running CI builds on GCE (Google Compute Engine) for better performance and cost optimization.

## Prerequisites

1. **Node.js 20+** installed locally
2. **Yarn** package manager
3. **Git** configured with proper credentials
4. **GitHub repository** with Actions enabled
5. **Apple Developer Account** (for iOS)
6. **Google Play Console** account (for Android)
7. **Firebase Project** (for internal distribution)

## Initial Setup

### 1. Install Dependencies

```bash
yarn install
```

This will install all required dependencies including:
- `standard-version` for versioning
- `@testing-library/react-native` for component testing
- All existing project dependencies

### 2. Configure Android Signing

#### Generate a Keystore (if you don't have one)

```bash
cd android
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

#### Configure Keystore in CI/CD

1. Encode your keystore file to base64:
   ```bash
   base64 -i my-release-key.keystore | pbcopy
   ```

2. Add the following secrets to GitHub:
   - `ANDROID_KEYSTORE_BASE64`: The base64-encoded keystore
   - `ANDROID_KEYSTORE_PASSWORD`: Your keystore password
   - `ANDROID_KEY_ALIAS`: Your key alias
   - `ANDROID_KEY_PASSWORD`: Your key password

### 3. Configure iOS Signing

#### Set up Match (Recommended)

Match manages certificates and provisioning profiles automatically.

1. Initialize match:
   ```bash
   cd ios
   bundle install
   bundle exec fastlane match init
   ```

2. Create certificates and profiles:
   ```bash
   bundle exec fastlane match appstore
   bundle exec fastlane match development
   ```

3. Add GitHub secrets:
   - `APPLE_ID`: Your Apple ID email
   - `APPLE_APP_SPECIFIC_PASSWORD`: Generate at appleid.apple.com
   - `MATCH_PASSWORD`: Password for encrypting certificates
   - `MATCH_GIT_BASIC_AUTHORIZATION`: Base64 encoded `username:token` for match git repo

### 4. Configure Firebase App Distribution

1. Create a Firebase project
2. Add your Android app to Firebase
3. Get your App ID from Firebase Console
4. Create a service account:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate new private key
   - Encode to base64: `base64 -i service-account.json | pbcopy`
5. Add GitHub secrets:
   - `FIREBASE_ANDROID_APP_ID`: Your Firebase Android App ID
   - `FIREBASE_SERVICE_ACCOUNT`: Base64-encoded service account JSON

### 5. Configure Google Play Store

1. Create a service account in Google Cloud Console
2. Grant it access to your Google Play Console
3. Download the JSON key file
4. Add GitHub secret:
   - `GOOGLE_PLAY_SERVICE_ACCOUNT`: The entire JSON content

## Local Development

### Running CI Checks Locally

```bash
# Check formatting
yarn format:check

# Run linter
yarn lint

# Type check
yarn type-check

# Run tests with coverage
yarn test:coverage
```

### Creating a Release

1. **Prepare release** (updates version and generates changelog):
   ```bash
   yarn release:prepare
   ```

   Or specify version type:
   ```bash
   yarn release:patch   # 1.0.0 -> 1.0.1
   yarn release:minor   # 1.0.0 -> 1.1.0
   yarn release:major   # 1.0.0 -> 2.0.0
   ```

2. **Review changes**:
   - Check `CHANGELOG.md` for generated changelog
   - Verify `package.json` version
   - Review git diff

3. **Push the tag**:
   ```bash
   git push --follow-tags
   ```

   This triggers the CD pipeline automatically.

## Docker Build Environment (Phase 2)

The `Dockerfile.android` provides a complete Android build environment. To use it:

### Build the Docker Image

```bash
docker build -f Dockerfile.android -t rn-android-builder .
```

### Run Builds in Docker

```bash
docker run -v $(pwd):/workspace rn-android-builder bash -c "cd /workspace && yarn install && cd android && ./gradlew assembleRelease"
```

## Fastlane Configuration

### iOS Fastlane

Located in `ios/fastlane/Fastfile`:

- `build`: Builds the iOS app
- `beta`: Builds and uploads to TestFlight
- `release`: Builds and uploads to App Store

### Android Fastlane

Located in `android/fastlane/Fastfile`:

- `build`: Builds release APK
- `build_bundle`: Builds release AAB
- `firebase_distribution`: Uploads to Firebase App Distribution
- `deploy_internal`: Deploys to Google Play internal track
- `deploy_production`: Deploys to Google Play production with staged rollout

## Workflow Triggers

### CI Pipeline
- **Triggers**: Pull requests and pushes to `main`, `develop`, `master`
- **Runs**: Linting, formatting, type checking, tests, optional Android build

### CD Pipeline
- **Triggers**: New version tags (e.g., `v1.0.0`)
- **Runs**: Versioning, building, signing, distribution, store deployment

## Troubleshooting

### Android Build Fails

1. **Signing issues**: Verify keystore secrets are correctly set
2. **Gradle issues**: Clear cache: `cd android && ./gradlew clean`
3. **SDK issues**: Ensure Android SDK is properly configured

### iOS Build Fails

1. **Certificate issues**: Run `bundle exec fastlane match appstore` to refresh
2. **CocoaPods issues**: Run `pod install` in `ios/` directory
3. **Xcode issues**: Ensure Xcode command line tools are installed

### Test Failures

1. Check coverage thresholds in `jest.config.js`
2. Run tests locally: `yarn test:coverage`
3. Review test output for specific failures

## Best Practices

1. **Always test locally** before pushing
2. **Use semantic commits** for better changelog generation
3. **Review generated changelog** before releasing
4. **Start with internal distribution** before production
5. **Monitor build times** and optimize as needed
6. **Keep secrets secure** - never commit them to git

## Security Notes

- All sensitive data (keystores, certificates, passwords) are stored as GitHub Secrets
- Keystore files are base64-encoded for storage
- Match uses encrypted storage for iOS certificates
- Service account keys are stored securely in GitHub Secrets

## Next Steps

1. Set up all required secrets in GitHub
2. Test the CI pipeline with a pull request
3. Create a test release tag to verify CD pipeline
4. Configure store listings and metadata
5. Set up monitoring and notifications

## Support

For issues or questions:
1. Check GitHub Actions logs for detailed error messages
2. Review Fastlane documentation: https://docs.fastlane.tools/
3. Check React Native documentation: https://reactnative.dev/
