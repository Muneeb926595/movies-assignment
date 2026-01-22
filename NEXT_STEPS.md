# Next Steps - External Setup Guide

This guide walks you through all the external services and configurations you need to set up before the CI/CD pipeline can work.

## 📋 Checklist

- [ ] GitHub Secrets Configuration
- [ ] Firebase Project Setup (for Android internal distribution)
- [ ] Google Play Console Setup (for Android store deployment)
- [ ] Apple Developer Account Setup (for iOS)
- [ ] TestFlight Configuration (for iOS internal distribution)
- [ ] App Store Connect Setup (for iOS store deployment)
- [ ] (Optional) GCP Setup for Phase 2 CI/CD Offloading

---

## 1. GitHub Secrets Configuration

### Where to Add Secrets
1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each secret below

### Android Secrets

#### `ANDROID_KEYSTORE_BASE64`
**Purpose**: Your release keystore file (base64 encoded)

**Steps**:
1. Generate a keystore (if you don't have one):
   ```bash
   cd android
   keytool -genkeypair -v -storetype PKCS12 \
     -keystore my-release-key.keystore \
     -alias my-key-alias \
     -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Encode to base64:
   ```bash
   # macOS/Linux
   base64 -i android/my-release-key.keystore | pbcopy
   
   # Or use the helper script
   ./scripts/setup-secrets.sh android/my-release-key.keystore ANDROID_KEYSTORE_BASE64
   ```

3. Paste the output into GitHub Secret

#### `ANDROID_KEYSTORE_PASSWORD`
**Purpose**: Password for your keystore file
- Enter the password you used when creating the keystore

#### `ANDROID_KEY_ALIAS`
**Purpose**: Alias name for your signing key
- Usually: `my-key-alias` or `upload`

#### `ANDROID_KEY_PASSWORD`
**Purpose**: Password for your signing key
- Can be the same as keystore password or different

---

## 2. Firebase App Distribution Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** or select existing project
3. Follow the setup wizard

### Step 2: Add Android App to Firebase
1. In Firebase Console, click **Add app** → **Android**
2. Enter package name: `com.uptodo`
3. Register the app
4. Download `google-services.json` (optional for now, needed if you add Firebase SDK)

### Step 3: Get Firebase App ID
1. In Firebase Console, go to **Project Settings** → **Your apps**
2. Find your Android app
3. Copy the **App ID** (format: `1:123456789:android:abcdef123456`)

### Step 4: Create Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to **IAM & Admin** → **Service Accounts**
4. Click **Create Service Account**
5. Name: `firebase-app-distribution`
6. Role: **Firebase App Distribution Admin**
7. Click **Done**
8. Click on the created service account
9. Go to **Keys** tab → **Add Key** → **Create new key** → **JSON**
10. Download the JSON file

### Step 5: Encode Service Account JSON
```bash
# macOS/Linux
base64 -i path/to/service-account.json | pbcopy

# Or use helper script
./scripts/setup-secrets.sh path/to/service-account.json FIREBASE_SERVICE_ACCOUNT
```

### Step 6: Add to GitHub Secrets
- `FIREBASE_ANDROID_APP_ID`: The App ID from Step 3
- `FIREBASE_SERVICE_ACCOUNT`: Base64-encoded service account JSON

### Step 7: Create Test Group
1. In Firebase Console, go to **App Distribution**
2. Click **Testers & Groups** → **Create group**
3. Name: `internal-testers`
4. Add tester emails
5. Save the group

---

## 3. Google Play Console Setup

### Step 1: Create Google Play Developer Account
1. Go to [Google Play Console](https://play.google.com/console/)
2. Pay the one-time $25 registration fee
3. Complete account setup

### Step 2: Create App in Play Console
1. Click **Create app**
2. Fill in app details:
   - App name: `UpTodo` (or your app name)
   - Default language: English
   - App or game: App
   - Free or paid: Choose
3. Click **Create**

### Step 3: Create Service Account for API Access
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create new one)
3. Navigate to **IAM & Admin** → **Service Accounts**
4. Click **Create Service Account**
5. Name: `play-store-deployer`
6. Click **Create and Continue**
7. Role: **Service Account User** (basic role)
8. Click **Done**

### Step 4: Grant Play Console Access
1. Go back to [Google Play Console](https://play.google.com/console/)
2. Navigate to **Setup** → **API access**
3. Click **Link service account** (or create new)
4. Select the service account you created
5. Grant permissions:
   - **View app information and download bulk reports**
   - **Manage production releases**
   - **Manage testing track releases**
6. Click **Grant access**

### Step 5: Create and Download Service Account Key
1. Go back to Google Cloud Console
2. Navigate to **IAM & Admin** → **Service Accounts**
3. Click on your service account
4. Go to **Keys** tab
5. Click **Add Key** → **Create new key** → **JSON**
6. Download the JSON file

### Step 6: Add to GitHub Secrets
```bash
# Encode the entire JSON content
cat path/to/play-store-service-account.json | base64 | pbcopy
```
- `GOOGLE_PLAY_SERVICE_ACCOUNT`: The entire JSON content (not base64, just the JSON string)

**Note**: Fastlane's `supply` action expects the JSON content directly, not base64 encoded.

---

## 4. Apple Developer Account Setup

### Step 1: Enroll in Apple Developer Program
1. Go to [Apple Developer](https://developer.apple.com/)
2. Enroll in the program ($99/year)
3. Complete enrollment process

### Step 2: Create App ID
1. Go to [Apple Developer Portal](https://developer.apple.com/account/)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Click **Identifiers** → **+** button
4. Select **App IDs** → **Continue**
5. Select **App**
6. Enter:
   - Description: `UpTodo`
   - Bundle ID: `com.uptodo` (must match your app)
7. Select capabilities (Push Notifications, etc.)
8. Click **Continue** → **Register**

### Step 3: Set Up Match (Recommended) or Manual Certificates

#### Option A: Using Match (Recommended - Automated)
1. Install Fastlane:
   ```bash
   cd ios
   bundle install
   ```

2. Initialize Match:
   ```bash
   bundle exec fastlane match init
   ```
   - Choose: `git` (store certificates in private git repo)
   - Enter repository URL (create a private repo for certificates)

3. Create certificates:
   ```bash
   bundle exec fastlane match appstore
   bundle exec fastlane match development
   ```

4. Add GitHub Secrets:
   - `MATCH_PASSWORD`: Password you used for match encryption
   - `MATCH_GIT_BASIC_AUTHORIZATION`: Base64 encoded `username:token` for git access
     ```bash
     echo -n "username:personal_access_token" | base64 | pbcopy
     ```

#### Option B: Manual Certificate Setup
1. Create certificates in Apple Developer Portal
2. Download and manage manually
3. Configure in Xcode

### Step 4: Create App in App Store Connect
1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Click **My Apps** → **+** → **New App**
3. Fill in:
   - Platform: iOS
   - Name: `UpTodo`
   - Primary Language: English
   - Bundle ID: Select `com.uptodo`
   - SKU: `uptodo-001` (unique identifier)
4. Click **Create**

### Step 5: Generate App-Specific Password
1. Go to [Apple ID Account Page](https://appleid.apple.com/)
2. Sign in with your Apple ID
3. Go to **Security** section
4. Under **App-Specific Passwords**, click **Generate Password**
5. Label: `GitHub Actions CI/CD`
6. Copy the generated password

### Step 6: Add to GitHub Secrets
- `APPLE_ID`: Your Apple ID email address
- `APPLE_APP_SPECIFIC_PASSWORD`: The app-specific password from Step 5

---

## 5. TestFlight Configuration

### Step 1: Add Internal Testers (Optional)
1. In App Store Connect, go to your app
2. Navigate to **TestFlight** tab
3. Click **Internal Testing** → **+** to add testers
4. Add Apple IDs of internal testers

### Step 2: Configure Beta Testing
1. Go to **TestFlight** → **External Testing** (if needed)
2. Create a test group
3. Add testers

**Note**: The CD pipeline will automatically upload builds to TestFlight. You just need to configure testers in App Store Connect.

---

## 6. (Optional) GCP Setup for Phase 2 - CI/CD Offloading

This is for future optimization. You can skip this for now and use GitHub Actions directly.

### If You Want to Set Up GCP for Better Performance:

1. **Create GCP Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing

2. **Enable Required APIs**
   - Cloud Build API
   - Compute Engine API
   - Cloud Storage API

3. **Set Up Service Account**
   - Create service account with Cloud Build permissions
   - Generate JSON key

4. **Create GCE Instance** (for Android builds)
   - Machine type: `e2-highcpu-32` (as per document)
   - OS: Ubuntu 22.04
   - Install Docker

5. **Set Up Cloud Storage** (for caching)
   - Create bucket for Gradle cache
   - Create bucket for Node modules cache

6. **Configure GitHub Actions**
   - Add GCP credentials to GitHub Secrets
   - Update workflows to use GCE runners

**Note**: This is Phase 2 optimization. The current setup works fine with GitHub Actions runners.

---

## 7. Verification Checklist

After setting up all secrets, verify:

### GitHub Secrets
- [ ] `ANDROID_KEYSTORE_BASE64`
- [ ] `ANDROID_KEYSTORE_PASSWORD`
- [ ] `ANDROID_KEY_ALIAS`
- [ ] `ANDROID_KEY_PASSWORD`
- [ ] `FIREBASE_ANDROID_APP_ID`
- [ ] `FIREBASE_SERVICE_ACCOUNT`
- [ ] `GOOGLE_PLAY_SERVICE_ACCOUNT`
- [ ] `APPLE_ID`
- [ ] `APPLE_APP_SPECIFIC_PASSWORD`
- [ ] `MATCH_PASSWORD` (if using Match)
- [ ] `MATCH_GIT_BASIC_AUTHORIZATION` (if using Match)

### External Services
- [ ] Firebase project created
- [ ] Firebase test group created
- [ ] Google Play Console app created
- [ ] Apple Developer account enrolled
- [ ] App ID created in Apple Developer
- [ ] App created in App Store Connect
- [ ] Certificates/profiles set up (via Match or manual)

---

## 8. Testing the Setup

### Test CI Pipeline
1. Create a test branch:
   ```bash
   git checkout -b test/ci-pipeline
   ```

2. Make a small change (e.g., add a comment)

3. Commit and push:
   ```bash
   git add .
   git commit -m "test: verify CI pipeline"
   git push origin test/ci-pipeline
   ```

4. Create a Pull Request to `main` or `develop`

5. Check GitHub Actions tab to see CI pipeline running

### Test CD Pipeline (After First Release)
1. Make sure you're on `main` branch with all changes merged

2. Create a version tag:
   ```bash
   git tag v0.0.2
   git push origin v0.0.2
   ```

3. Check GitHub Actions tab to see CD pipeline running

4. Monitor the workflow:
   - Version and changelog generation
   - Android build
   - iOS build (if you have macOS runner)
   - Distribution to testers

---

## 9. Common Issues & Troubleshooting

### Android Build Fails
- **Issue**: Keystore not found
  - **Solution**: Verify `ANDROID_KEYSTORE_BASE64` is correctly encoded
- **Issue**: Signing failed
  - **Solution**: Check all keystore-related secrets match your actual keystore

### iOS Build Fails
- **Issue**: Certificate not found
  - **Solution**: Run `bundle exec fastlane match appstore` locally first
- **Issue**: Provisioning profile expired
  - **Solution**: Update profiles via Match or manually in Apple Developer Portal

### Firebase Distribution Fails
- **Issue**: Service account not authorized
  - **Solution**: Verify service account has Firebase App Distribution Admin role
- **Issue**: App ID not found
  - **Solution**: Double-check `FIREBASE_ANDROID_APP_ID` matches your Firebase app

### Google Play Upload Fails
- **Issue**: Service account not linked
  - **Solution**: Link service account in Play Console → API access
- **Issue**: JSON key format error
  - **Solution**: Ensure `GOOGLE_PLAY_SERVICE_ACCOUNT` contains the full JSON, not base64

---

## 10. Quick Reference Commands

### Encode Files for GitHub Secrets
```bash
# Keystore
./scripts/setup-secrets.sh android/my-release-key.keystore ANDROID_KEYSTORE_BASE64

# Service Account JSON
./scripts/setup-secrets.sh path/to/service-account.json FIREBASE_SERVICE_ACCOUNT
```

### Test Locally
```bash
# Run all CI checks
yarn format:check
yarn lint
yarn type-check
yarn test:coverage

# Build Android locally
cd android && ./gradlew assembleRelease

# Build iOS locally (requires macOS)
cd ios && bundle exec fastlane build
```

### Create Release
```bash
# Auto-increment version
yarn release:prepare

# Or specify version type
yarn release:patch   # 1.0.0 -> 1.0.1
yarn release:minor   # 1.0.0 -> 1.1.0
yarn release:major   # 1.0.0 -> 2.0.0

# Push tag to trigger CD
git push --follow-tags
```

---

## Support Resources

- **Firebase Docs**: https://firebase.google.com/docs/app-distribution
- **Google Play API**: https://developers.google.com/android-publisher
- **Fastlane Docs**: https://docs.fastlane.tools/
- **Apple Developer**: https://developer.apple.com/documentation/
- **GitHub Actions**: https://docs.github.com/en/actions

---

## Priority Order

If you want to set things up incrementally:

1. **First**: Set up GitHub Secrets for Android (keystore)
2. **Second**: Test CI pipeline with a PR
3. **Third**: Set up Firebase for internal Android distribution
4. **Fourth**: Set up Apple Developer account and iOS certificates
5. **Fifth**: Set up Google Play and App Store for production releases

You can test the CI pipeline immediately, but CD pipeline requires all secrets to be configured.
