# Comprehensive Testing Guide

This guide provides a complete overview of the testing framework setup for this React Native application.

## 🎯 Overview

The testing framework is designed to be:

- **Fast**: Optimized Jest configuration with caching
- **Scalable**: Organized structure that grows with your app
- **Comprehensive**: Unit, component, integration, and E2E tests
- **Maintainable**: Reusable utilities and factories
- **Best Practices**: Following React Native Testing Library guidelines

## 📦 What's Included

### 1. Enhanced Jest Configuration

- Optimized for performance (50% CPU usage, caching)
- Per-directory coverage thresholds
- Better module resolution
- Comprehensive mock setup

### 2. Test Utilities (`__tests__/utils/`)

#### `test-utils.tsx`

- Custom `render` function with all providers
- Query client setup for React Query
- Theme and translation providers
- Navigation mocks

#### `mock-factories.ts`

- Movie data factories
- API response factories
- Storage adapter factories
- Error response factories

#### `accessibility-helpers.ts`

- Accessibility label checking
- Role verification
- Accessibility assertions

#### `performance-helpers.ts`

- Execution time measurement
- Render time measurement
- Performance assertions

#### `snapshot-helpers.ts`

- Component snapshot creation
- Snapshot with providers

### 3. Component Testing Examples

- Button component test
- List component test
- Demonstrates best practices

### 4. E2E Testing Setup

- Detox configuration
- iOS and Android configurations
- Example E2E test

## 🚀 Quick Start

### Install Dependencies

```bash
yarn install
```

### Run Tests

```bash
# All tests
yarn test

# Watch mode
yarn test:watch

# With coverage
yarn test:coverage

# Specific test type
yarn test:unit
yarn test:component
```

### Run E2E Tests

```bash
# Build first
yarn test:e2e:build:ios
yarn test:e2e:build:android

# Then test
yarn test:e2e:ios
yarn test:e2e:android
```

## 📝 Writing Your First Test

### Component Test

```typescript
import React from 'react';
import { render, fireEvent } from '../utils/test-utils';
import { MyComponent } from '../../src/views/components/my-component';

describe('MyComponent', () => {
  it('should render correctly', () => {
    const { getByText } = render(<MyComponent title="Hello" />);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('should handle press events', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <MyComponent title="Click me" onPress={onPress} />,
    );

    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### Repository Test

```typescript
import { moviesRepository } from '../../src/repository/movies';
import {
  createMockMovies,
  createMockApiResponse,
} from '../utils/mock-factories';

describe('MoviesRepository', () => {
  it('should fetch and normalize movies', async () => {
    const mockMovies = createMockMovies(5);
    const mockResponse = createMockApiResponse({
      results: mockMovies,
    });

    moviesEndpoints.getPopularMovies.mockResolvedValue(mockResponse);

    const result = await moviesRepository.getPopularMovies();
    expect(result.results).toHaveLength(5);
  });
});
```

## 🎨 Test Organization

### File Naming

- Unit tests: `*.test.ts` or `*.test.tsx`
- Component tests: `*.test.tsx`
- E2E tests: `*.e2e.ts`

### Directory Structure

```
__tests__/
├── components/        # Component tests
├── integration/       # Integration tests
├── repository/        # Repository tests
├── services/          # Service tests
└── utils/            # Test utilities
```

## 🔧 Configuration

### Jest Config (`jest.config.js`)

- Test patterns and ignore paths
- Coverage thresholds
- Module resolution
- Performance optimizations

### Jest Setup (`jest.setup.js`)

- Global mocks
- React Native mocks
- Navigation mocks
- Platform mocks

### Detox Config (`.detoxrc.js`)

- iOS and Android builds
- Simulator/emulator configs
- Test runner setup

## 📊 Coverage

### Current Thresholds

- **Global**: 70% (branches, functions, lines, statements)
- **Repository**: 80% (critical business logic)
- **Services**: 75% (important services)

### View Coverage

```bash
yarn test:coverage
open coverage/lcov-report/index.html
```

## 🎯 Best Practices

### 1. Test User Behavior

Test what users see and interact with, not implementation details.

```typescript
// ❌ Bad - testing implementation
expect(component.state.isLoading).toBe(false);

// ✅ Good - testing user experience
expect(getByText('Content')).toBeTruthy();
```

### 2. Use Test Utilities

Always use the custom render function:

```typescript
// ❌ Bad
import { render } from '@testing-library/react-native';

// ✅ Good
import { render } from '../utils/test-utils';
```

### 3. Use Factories

Create test data with factories:

```typescript
// ❌ Bad
const movie = { id: 1, title: 'Test', ... };

// ✅ Good
const movie = createMockMovie({ title: 'Test' });
```

### 4. Clean Up

Always clean up mocks between tests:

```typescript
beforeEach(() => {
  jest.clearAllMocks();
});
```

### 5. Descriptive Names

Use clear, descriptive test names:

```typescript
// ❌ Bad
it('works', () => { ... });

// ✅ Good
it('should return formatted date when given valid ISO date string', () => { ... });
```

## 🐛 Debugging

### VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal"
}
```

### Console Logs

Enable console logs:

```bash
SILENCE_CONSOLE=false yarn test
```

### Single Test

Run a single test file:

```bash
yarn test path/to/test.test.ts
```

When adding new tests:

1. Follow the existing structure
2. Use provided utilities
3. Write descriptive test names
4. Maintain coverage thresholds
5. Update this guide if needed
