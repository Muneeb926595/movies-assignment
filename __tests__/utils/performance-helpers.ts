/**
 * Performance Testing Helpers
 * 
 * Utilities for measuring and testing performance in React Native components
 */

declare const performance: {
  now(): number;
  memory?: { usedJSHeapSize: number };
};
declare const global: typeof globalThis & {
  performance: typeof performance;
};

/**
 * Measure execution time of a function
 */
export const measureExecutionTime = async <T>(
  fn: () => T | Promise<T>,
): Promise<{ result: T; time: number }> => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  return {
    result,
    time: end - start,
  };
};

/**
 * Assert that a function executes within a time limit
 */
export const assertExecutionTime = async <T>(
  fn: () => T | Promise<T>,
  maxTime: number,
): Promise<T> => {
  const { result, time } = await measureExecutionTime(fn);
  expect(time).toBeLessThan(maxTime);
  return result;
};

/**
 * Measure render time of a component
 */
export const measureRenderTime = async (
  renderFn: () => void,
): Promise<number> => {
  const start = performance.now();
  renderFn();
  const end = performance.now();
  return end - start;
};

/**
 * Assert component renders within time limit
 */
export const assertRenderTime = async (
  renderFn: () => void,
  maxTime: number,
): Promise<void> => {
  const time = await measureRenderTime(renderFn);
  expect(time).toBeLessThan(maxTime);
};

/**
 * Measure memory usage (approximate)
 */
export const measureMemoryUsage = (): number => {
  if (global.performance && (global.performance as any).memory) {
    return (global.performance as any).memory.usedJSHeapSize;
  }
  return 0;
};

/**
 * Get performance metrics
 */
export const getPerformanceMetrics = () => {
  return {
    memory: measureMemoryUsage(),
    timestamp: performance.now(),
  };
};
