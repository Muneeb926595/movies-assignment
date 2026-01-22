module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',

  // Test file patterns - organized by test type
  testMatch: [
    '**/__tests__/**/*.test.{ts,tsx}',
    '**/__tests__/**/*.spec.{ts,tsx}',
    '**/*.test.{ts,tsx}',
    '**/*.spec.{ts,tsx}',
  ],

  // Exclude patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
    '/.git/',
    '/coverage/',
    '/dist/',
    '/build/',
    '/e2e/',
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
    '!src/**/*.styles.{ts,tsx}',
    '!src/globals/**',
    '!src/**/*.types.ts',
    '!src/**/types.ts',
  ],

  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
    // Per-directory thresholds for critical paths
    './src/repository/': {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
    './src/services/': {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },

  // Module paths
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Setup files
  setupFiles: ['<rootDir>/jest.pre-setup.js'],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
    '@testing-library/react-native/extend-expect',
  ],

  // Transform
  transform: {
    '^.+\\.(ts|tsx)$': [
      'babel-jest',
      {
        presets: ['@react-native/babel-preset'],
        plugins: [],
      },
    ],
  },

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@gorhom|react-native-.*|@tanstack|zustand|@testing-library)/)',
  ],

  // Performance optimizations
  maxWorkers: '50%', // Use half of available CPUs
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',

  // Clear mocks between tests
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  // Test timeout
  testTimeout: 10000,

  // Coverage reporters
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html',
    'json',
    'json-summary',
  ],

  // Verbose output for better debugging
  verbose: true,

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
