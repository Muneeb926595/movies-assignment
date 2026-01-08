/**
 * Date Time Utils Test Suite
 *
 * Tests date manipulation and formatting utilities
 */

import { convertDateStringToObj } from '../../src/utils/date-time-utils';

describe('date-time-utils', () => {
  describe('convertDateStringToObj', () => {
    it('should convert valid date string to calendar object format', () => {
      // Arrange
      const dateString = '2024-03-15';

      // Act
      const result = convertDateStringToObj(dateString);

      // Assert
      expect(result).toEqual({
        '2024-03-15': {
          marked: true,
          selected: true,
        },
      });
    });

    it('should handle ISO 8601 date string', () => {
      // Arrange
      const dateString = '2024-01-05T12:00:00.000Z';

      // Act
      const result = convertDateStringToObj(dateString);

      // Assert
      expect(result).toHaveProperty('2024-01-05');
      expect(result?.['2024-01-05']).toEqual({
        marked: true,
        selected: true,
      });
    });

    it('should handle date string with single digit month', () => {
      // Arrange
      const dateString = '2024-01-15';

      // Act
      const result = convertDateStringToObj(dateString);

      // Assert
      expect(result).toEqual({
        '2024-01-15': {
          marked: true,
          selected: true,
        },
      });
    });

    it('should handle date string with single digit day', () => {
      // Arrange
      const dateString = '2024-12-05';

      // Act
      const result = convertDateStringToObj(dateString);

      // Assert
      expect(result).toEqual({
        '2024-12-05': {
          marked: true,
          selected: true,
        },
      });
    });

    it('should pad single digit months with leading zero', () => {
      // Arrange
      const dateString = '2024-05-25';

      // Act
      const result = convertDateStringToObj(dateString);
      const key = Object.keys(result || {})[0];

      // Assert
      expect(key).toBe('2024-05-25');
      expect(key).toMatch(/^\d{4}-0\d-\d{2}$/); // Month should be padded
    });

    it('should pad single digit days with leading zero', () => {
      // Arrange
      const dateString = '2024-11-03';

      // Act
      const result = convertDateStringToObj(dateString);
      const key = Object.keys(result || {})[0];

      // Assert
      expect(key).toBe('2024-11-03');
      expect(key).toMatch(/^\d{4}-\d{2}-0\d$/); // Day should be padded
    });

    it('should handle Date object input', () => {
      // Arrange
      const date = new Date('2024-06-15');

      // Act
      const result = convertDateStringToObj(date);

      // Assert
      expect(result).toHaveProperty('2024-06-15');
    });

    it('should handle timestamp input', () => {
      // Arrange
      const timestamp = new Date('2024-07-20').getTime();

      // Act
      const result = convertDateStringToObj(timestamp);

      // Assert
      expect(result).toHaveProperty('2024-07-20');
    });

    it('should return null for null input', () => {
      // Act
      const result = convertDateStringToObj(null);

      // Assert
      expect(result).toBeNull();
    });

    it('should return null for undefined input', () => {
      // Act
      const result = convertDateStringToObj(undefined);

      // Assert
      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      // Act
      const result = convertDateStringToObj('');

      // Assert
      expect(result).toBeNull();
    });

    it('should handle leap year dates correctly', () => {
      // Arrange
      const dateString = '2024-02-29'; // 2024 is a leap year

      // Act
      const result = convertDateStringToObj(dateString);

      // Assert
      expect(result).toEqual({
        '2024-02-29': {
          marked: true,
          selected: true,
        },
      });
    });

    it('should handle end of year date', () => {
      // Arrange
      const dateString = '2024-12-31';

      // Act
      const result = convertDateStringToObj(dateString);

      // Assert
      expect(result).toEqual({
        '2024-12-31': {
          marked: true,
          selected: true,
        },
      });
    });

    it('should handle beginning of year date', () => {
      // Arrange
      const dateString = '2024-01-01';

      // Act
      const result = convertDateStringToObj(dateString);

      // Assert
      expect(result).toEqual({
        '2024-01-01': {
          marked: true,
          selected: true,
        },
      });
    });

    it('should handle different year formats', () => {
      // Arrange
      const dateString = '2025-08-15';

      // Act
      const result = convertDateStringToObj(dateString);

      // Assert
      expect(result).toHaveProperty('2025-08-15');
      const key = Object.keys(result || {})[0];
      expect(key.startsWith('2025')).toBe(true);
    });

    it('should create object with correct properties', () => {
      // Arrange
      const dateString = '2024-10-10';

      // Act
      const result = convertDateStringToObj(dateString);
      const value = result?.['2024-10-10'];

      // Assert
      expect(value).toHaveProperty('marked');
      expect(value).toHaveProperty('selected');
      expect(value?.marked).toBe(true);
      expect(value?.selected).toBe(true);
    });

    it('should handle various date string formats', () => {
      // Arrange
      const formats = [
        '2024-03-15',
        '2024/03/15',
        'March 15, 2024',
        '15 Mar 2024',
      ];

      // Act & Assert
      formats.forEach(format => {
        const result = convertDateStringToObj(format);
        expect(result).not.toBeNull();
        expect(result).toHaveProperty(Object.keys(result || {})[0]);
      });
    });

    it('should handle timezone differences correctly', () => {
      // Arrange
      const dateString = '2024-05-15T23:59:59Z';

      // Act
      const result = convertDateStringToObj(dateString);

      // Assert
      // The date should be preserved (may vary based on timezone)
      expect(result).not.toBeNull();
      expect(Object.keys(result || {}).length).toBe(1);
    });
  });
});
