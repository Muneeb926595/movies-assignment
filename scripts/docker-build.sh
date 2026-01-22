#!/bin/bash

# Script to build React Native Android app using Docker
# Usage: ./scripts/docker-build.sh [build_type]
# build_type: debug (default) or release

set -e

BUILD_TYPE=${1:-debug}
IMAGE_NAME="rn-android-builder"
CONTAINER_NAME="rn-android-build-$(date +%s)"

echo "🚀 Building React Native Android app in Docker..."
echo "Build type: $BUILD_TYPE"

# Build Docker image if it doesn't exist
if ! docker image inspect $IMAGE_NAME &> /dev/null; then
    echo "📦 Building Docker image..."
    docker build -f Dockerfile.android -t $IMAGE_NAME .
fi

# Create container and run build
echo "🔨 Running build..."
docker run --name $CONTAINER_NAME \
    -v "$(pwd):/workspace" \
    -w /workspace \
    $IMAGE_NAME \
    bash -c "
        echo 'Installing dependencies...'
        yarn install --frozen-lockfile
        
        echo 'Building Android app...'
        cd android
        
        if [ '$BUILD_TYPE' = 'release' ]; then
            ./gradlew bundleRelease
            echo '✅ Release bundle built successfully!'
            echo 'Location: android/app/build/outputs/bundle/release/'
        else
            ./gradlew assembleDebug
            echo '✅ Debug APK built successfully!'
            echo 'Location: android/app/build/outputs/apk/debug/'
        fi
    "

# Copy artifacts out of container
echo "📥 Copying build artifacts..."
docker cp $CONTAINER_NAME:/workspace/android/app/build/outputs ./build-outputs 2>/dev/null || true

# Cleanup
echo "🧹 Cleaning up..."
docker rm $CONTAINER_NAME

echo "✅ Build complete!"
