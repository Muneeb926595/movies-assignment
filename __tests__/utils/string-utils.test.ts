/**
 * String Utils Test Suite
 *
 * Tests string manipulation and validation utilities
 */

import { isValidUrl } from '../../src/utils/string-utils';

describe('string-utils', () => {
  describe('isValidUrl', () => {
    // Valid URL tests
    it('should return true for valid HTTP URL', () => {
      // Arrange
      const url = 'http://example.com';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for valid HTTPS URL', () => {
      // Arrange
      const url = 'https://example.com';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for URL with path', () => {
      // Arrange
      const url = 'https://example.com/path/to/page';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for URL with query parameters', () => {
      // Arrange
      const url = 'https://example.com/search?q=test&page=1';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for URL with hash fragment', () => {
      // Arrange
      const url = 'https://example.com/page#section';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for URL with port number', () => {
      // Arrange
      const url = 'https://example.com:8080/api';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for localhost URL', () => {
      // Arrange
      const url = 'http://localhost:3000';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for IP address URL', () => {
      // Arrange
      const url = 'http://192.168.1.1:8080';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for URL with subdomain', () => {
      // Arrange
      const url = 'https://api.example.com/v1/users';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for URL with authentication', () => {
      // Arrange
      const url = 'https://user:pass@example.com';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for FTP URL', () => {
      // Arrange
      const url = 'ftp://ftp.example.com/file.txt';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true for file protocol URL', () => {
      // Arrange
      const url = 'file:///path/to/file.txt';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    // Invalid URL tests
    it('should return false for string without protocol', () => {
      // Arrange
      const url = 'example.com';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for empty string', () => {
      // Arrange
      const url = '';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for string with spaces', () => {
      // Arrange
      const url = 'not a url';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for malformed URL', () => {
      // Arrange
      const url = 'http://';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for URL with invalid protocol', () => {
      // Arrange
      const url = 'ht!tp://example.com';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for URL with only protocol', () => {
      // Arrange
      const url = 'https://';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for string with special characters only', () => {
      // Arrange
      const url = '!@#$%^&*()';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for relative path', () => {
      // Arrange
      const url = '/path/to/page';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for path starting with ./', () => {
      // Arrange
      const url = './relative/path';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for path starting with ../', () => {
      // Arrange
      const url = '../parent/path';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });

    // Edge cases
    it('should handle URL with encoded characters', () => {
      // Arrange
      const url = 'https://example.com/path%20with%20spaces';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should handle URL with unicode characters', () => {
      // Arrange
      const url = 'https://例え.jp';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should handle very long valid URL', () => {
      // Arrange
      const longPath = 'a'.repeat(1000);
      const url = `https://example.com/${longPath}`;

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should handle URL with multiple query parameters', () => {
      // Arrange
      const url =
        'https://example.com/api?param1=value1&param2=value2&param3=value3';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should handle URL with special characters in query', () => {
      // Arrange
      const url = 'https://example.com/search?q=hello+world&filter=new';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should handle data URL', () => {
      // Arrange
      const url = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should handle blob URL', () => {
      // Arrange
      const url =
        'blob:https://example.com/550e8400-e29b-41d4-a716-446655440000';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should handle mailto URL', () => {
      // Arrange
      const url = 'mailto:test@example.com';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should handle tel URL', () => {
      // Arrange
      const url = 'tel:+1234567890';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for null-like string', () => {
      // Arrange
      const url = 'null';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for undefined-like string', () => {
      // Arrange
      const url = 'undefined';

      // Act
      const result = isValidUrl(url);

      // Assert
      expect(result).toBe(false);
    });
  });
});
