# Testing Framework Documentation

This directory contains the comprehensive testing framework for the React Native application.

## 📁 Directory Structure

```
__tests__/
├── components/          # Component tests
├── integration/        # Integration tests
├── repository/          # Repository layer tests
├── services/            # Service layer tests
├── utils/               # Test utilities and helpers
│   ├── test-utils.tsx   # Custom render with providers
│   ├── mock-factories.ts # Mock data factories
│   ├── accessibility-helpers.ts # A11y testing
│   ├── performance-helpers.ts   # Performance testing
│   └── snapshot-helpers.ts      # Snapshot testing
└── README.md            # This file
```

## 🧪 Test Types

### 1. Unit Tests

- **Location**: `__tests__/repository/`, `__tests__/services/`, `__tests__/utils/`
- **Purpose**: Test individual functions and classes in isolation
- **Run**: `yarn test:unit`

### 2. Component Tests

- **Location**: `__tests__/components/`
- **Purpose**: Test React components in isolation
- **Tools**: React Native Testing Library
- **Run**: `yarn test:component`

### 3. Integration Tests

- **Location**: `__tests__/integration/`
- **Purpose**: Test interactions between multiple components/services
- **Run**: `yarn test:integration`

### 4. E2E Tests

- **Location**: `e2e/`
- **Purpose**: Test complete user flows
- **Tools**: Detox
- **Run**: `yarn test:e2e`

## 🛠 Test Utilities

### `test-utils.tsx`

Custom render function with all providers pre-configured:

```typescript
import { render } from '../utils/test-utils';

test('my component', () => {
  const { getByText } = render(<MyComponent />);
  expect(getByText('Hello')).toBeTruthy();
});
```

### `mock-factories.ts`

Reusable factories for creating test data:

```typescript
import { createMockMovie, createMockMovies } from '../utils/mock-factories';

const movie = createMockMovie({ title: 'Custom Title' });
const movies = createMockMovies(10);
```

### `accessibility-helpers.ts`

Accessibility testing utilities:

```typescript
import { assertAccessibility } from '../utils/accessibility-helpers';

assertAccessibility(element, {
  label: 'Button',
  role: 'button',
  accessible: true,
});
```

### `performance-helpers.ts`

Performance measurement utilities:

```typescript
import { assertExecutionTime } from '../utils/performance-helpers';

await assertExecutionTime(() => expensiveFunction(), 100); // Must complete in <100ms
```

## 📝 Writing Tests

### Component Test Example

```typescript
import React from 'react';
import { render, fireEvent } from '../utils/test-utils';
import { Button } from '../../src/views/components/button';

describe('Button', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Click me" onPress={onPress} />);

    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### Repository Test Example

```typescript
import { moviesRepository } from '../../src/repository/movies';
import { createMockApiResponse } from '../utils/mock-factories';

describe('MoviesRepository', () => {
  it('should fetch popular movies', async () => {
    const mockResponse = createMockApiResponse({
      results: createMockMovies(5),
    });

    // Mock API call
    moviesEndpoints.getPopularMovies.mockResolvedValue(mockResponse);

    const result = await moviesRepository.getPopularMovies();
    expect(result.results).toHaveLength(5);
  });
});
```

## 🎯 Best Practices

### 1. AAA Pattern

Always structure tests with Arrange, Act, Assert:

```typescript
it('should do something', () => {
  // Arrange
  const input = 'test';

  // Act
  const result = functionToTest(input);

  // Assert
  expect(result).toBe('expected');
});
```

### 2. Descriptive Test Names

Use clear, descriptive test names:

```typescript
// ❌ Bad
it('works', () => { ... });

// ✅ Good
it('should return formatted date when given valid date string', () => { ... });
```

### 3. Test Isolation

Each test should be independent:

```typescript
beforeEach(() => {
  jest.clearAllMocks();
});
```

### 4. Use Factories

Use mock factories instead of creating objects manually:

```typescript
// ❌ Bad
const movie = { id: 1, title: 'Test', ... };

// ✅ Good
const movie = createMockMovie({ title: 'Test' });
```

### 5. Test User Behavior

Test what users see and do, not implementation details:

```typescript
// ❌ Bad
expect(component.state.isLoading).toBe(false);

// ✅ Good
expect(getByText('Content')).toBeTruthy();
```

## 🚀 Running Tests

```bash
# Run all tests
yarn test

# Run in watch mode
yarn test:watch

# Run with coverage
yarn test:coverage

# Run specific test type
yarn test:unit
yarn test:component
yarn test:integration

# Run E2E tests
yarn test:e2e
yarn test:e2e:ios
yarn test:e2e:android

# Update snapshots
yarn test:update-snapshots

# Clear Jest cache
yarn test:clear-cache
```

## 📊 Coverage

Coverage thresholds are set in `jest.config.js`:

- Global: 70% minimum
- Repository: 80% minimum
- Services: 75% minimum

View coverage report:

```bash
yarn test:coverage
open coverage/lcov-report/index.html
```

## 🔍 Debugging Tests

### VS Code Debugging

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

### Console Logging

Temporarily enable console logs:

```bash
SILENCE_CONSOLE=false yarn test
```
