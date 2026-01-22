/**
 * Jest Pre-Setup File
 * Runs BEFORE the test framework is initialized
 * This is critical for mocking Platform before React Native Testing Library loads
 */

// Setup global Platform mock FIRST - before any React Native imports
global.Platform = {
  OS: 'ios',
  select: jest.fn(dict => dict.ios || dict.default),
  Version: 15,
  isPad: false,
  isTV: false,
  isTVOS: false,
  isTesting: true,
};

// Mock Platform module path
jest.mock('react-native/Libraries/Utilities/Platform', () => global.Platform, {
  virtual: true,
});
