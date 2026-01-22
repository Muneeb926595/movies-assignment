/**
 * Jest Setup File
 * Runs after the test framework is initialized
 */

// Mock StatusBar
jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => ({
  __esModule: true,
  default: {
    setBarStyle: jest.fn(),
    setBackgroundColor: jest.fn(),
    setHidden: jest.fn(),
    setTranslucent: jest.fn(),
    setNetworkActivityIndicatorVisible: jest.fn(),
    currentHeight: 0,
  },
}));

// Mock React Native Worklets (required by Reanimated)
jest.mock('react-native-worklets', () => ({
  __esModule: true,
  default: {},
  useWorklet: jest.fn(fn => fn),
  useSharedValue: jest.fn(value => ({ value })),
  createSerializable: jest.fn(fn => fn),
  withReanimatedTimer: jest.fn(fn => fn),
}));

// Mock React Native Reanimated - use simpler approach
jest.mock('react-native-reanimated', () => ({
  __esModule: true,
  default: {
    call: jest.fn(),
    createAnimatedComponent: jest.fn(component => component),
    View: require('react-native').View,
    Text: require('react-native').Text,
    ScrollView: require('react-native').ScrollView,
    Image: require('react-native').Image,
  },
  useSharedValue: jest.fn(value => ({ value })),
  useAnimatedStyle: jest.fn(() => ({})),
  withTiming: jest.fn(value => value),
  withSpring: jest.fn(value => value),
  withDecay: jest.fn(value => value),
  Easing: {
    linear: jest.fn(),
    ease: jest.fn(),
    bezier: jest.fn(),
  },
}));

// Mock Gesture Handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    Swipeable: View,
    GestureHandlerRootView: View,
    PanGestureHandler: View,
  };
});

// Mock MMKV with createMMKV function
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    contains: jest.fn(),
    remove: jest.fn(),
    clearAll: jest.fn(),
    getAllKeys: jest.fn(() => []),
  })),
  MMKV: jest.fn(function () {
    return {
      set: jest.fn(),
      getString: jest.fn(),
      getNumber: jest.fn(),
      getBoolean: jest.fn(),
      contains: jest.fn(),
      remove: jest.fn(),
      clearAll: jest.fn(),
      getAllKeys: jest.fn(() => []),
    };
  }),
}));

// Mock Axios
jest.mock('axios', () => {
  const mockAxiosInstance = {
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    patch: jest.fn(() => Promise.resolve({ data: {} })),
  };

  return {
    __esModule: true,
    default: {
      create: jest.fn(() => mockAxiosInstance),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    },
  };
});

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(() => jest.fn()),
      removeListener: jest.fn(),
      canGoBack: jest.fn(() => true),
      dispatch: jest.fn(),
      reset: jest.fn(),
      isFocused: jest.fn(() => true),
    }),
    useRoute: () => ({
      key: 'test-route-key',
      name: 'TestRoute',
      params: {},
    }),
    useFocusEffect: jest.fn(),
  };
});

// Mock React Navigation Elements
jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: jest.fn(() => 0),
}));

// Mock Safe Area Context
jest.mock('react-native-safe-area-context', () => {
  const actual = jest.requireActual('react-native-safe-area-context');
  return {
    ...actual,
    useSafeAreaInsets: jest.fn(() => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    })),
    SafeAreaProvider: ({ children }) => children,
  };
});

// Mock Fast Image
jest.mock('@d11/react-native-fast-image', () => ({
  __esModule: true,
  default: require('react-native').Image,
}));

// Mock Vector Icons
jest.mock('react-native-vector-icons', () => ({
  __esModule: true,
  default: require('react-native').Text,
  createIconSet: jest.fn(() => require('react-native').Text),
}));

// Mock Sonner Native (Toast)
jest.mock('sonner-native', () => ({
  Toaster: () => null,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
}));

// Mock YouTube Iframe
jest.mock('react-native-youtube-iframe', () => ({
  __esModule: true,
  default: require('react-native').View,
}));

// Mock WebView
jest.mock('react-native-webview', () => ({
  __esModule: true,
  default: require('react-native').View,
}));

// Mock SVG
jest.mock('react-native-svg', () => {
  const View = require('react-native').View;
  return {
    Svg: View,
    Circle: View,
    Ellipse: View,
    G: View,
    Text: View,
    TSpan: View,
    TextPath: View,
    Path: View,
    Polygon: View,
    Polyline: View,
    Line: View,
    Rect: View,
    Use: View,
    Image: View,
    Symbol: View,
    Defs: View,
    LinearGradient: View,
    RadialGradient: View,
    Stop: View,
    ClipPath: View,
    Pattern: View,
    Mask: View,
    Marker: View,
    Title: View,
    Desc: View,
  };
});

// Mock Theme Switch Animation
jest.mock('react-native-theme-switch-animation', () => ({
  __esModule: true,
  default: jest.fn(),
  switchTheme: jest.fn(),
}));

// Mock Splash View
jest.mock('react-native-splash-view', () => ({
  __esModule: true,
  hideSplash: jest.fn(),
  showSplash: jest.fn(),
}));

// Setup global test timeout
jest.setTimeout(10000);

// Silence console errors in tests (optional - can be toggled)
if (process.env.SILENCE_CONSOLE !== 'false') {
  global.console = {
    ...console,
    error: jest.fn(),
    warn: jest.fn(),
    // Keep log for debugging
    log: console.log,
    info: console.info,
    debug: console.debug,
  };
}

// Setup performance API if not available
if (typeof global.performance === 'undefined') {
  global.performance = {
    now: () => Date.now(),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByType: jest.fn(() => []),
    getEntriesByName: jest.fn(() => []),
    clearMarks: jest.fn(),
    clearMeasures: jest.fn(),
  };
}
