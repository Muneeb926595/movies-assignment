/**
 * Error Handler Service Test Suite
 *
 * Tests error parsing and handling functionality
 */

import { Alert } from 'react-native';
import {
  parseApiError,
  showApiErrorAlert,
} from '../../../src/services/error-handler';
import { storageService, StorageKeys } from '../../../src/services/storage';

// Mock dependencies
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

jest.mock('../../../src/services/storage', () => ({
  storageService: {
    removeItem: jest.fn(),
  },
  StorageKeys: {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
  },
}));

describe('Error Handler Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('parseApiError', () => {
    it('should parse error with response data', () => {
      // Arrange
      const error = {
        response: {
          status: 400,
          data: {
            message: 'Bad request',
            code: 'INVALID_INPUT',
          },
        },
      };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result).toEqual({
        status: 400,
        message: 'Bad request',
        code: 'INVALID_INPUT',
        original: error,
      });
    });

    it('should use error field from response data if message is missing', () => {
      // Arrange
      const error = {
        response: {
          status: 500,
          data: {
            error: 'Internal server error',
          },
        },
      };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.message).toBe('Internal server error');
      expect(result.status).toBe(500);
    });

    it('should use detail field from response data as fallback', () => {
      // Arrange
      const error = {
        response: {
          status: 422,
          data: {
            detail: 'Validation failed',
          },
        },
      };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.message).toBe('Validation failed');
    });

    it('should use error message if response data has no message fields', () => {
      // Arrange
      const error = {
        response: {
          status: 404,
          data: {},
        },
        message: 'Not found',
      };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.message).toBe('Not found');
      expect(result.status).toBe(404);
    });

    it('should handle network errors (request without response)', () => {
      // Arrange
      const error = {
        request: {},
        message: 'Network Error',
      };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.message).toBe(
        'Network error. Please check your connection.',
      );
      expect(result.status).toBeUndefined();
    });

    it('should handle generic error with message', () => {
      // Arrange
      const error = {
        message: 'Something went wrong',
      };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.message).toBe('Something went wrong');
    });

    it('should handle null error', () => {
      // Act
      const result = parseApiError(null);

      // Assert
      expect(result.message).toBe('Unknown error');
      expect(result.original).toBeNull();
    });

    it('should handle undefined error', () => {
      // Act
      const result = parseApiError(undefined);

      // Assert
      expect(result.message).toBe('Unknown error');
    });

    it('should handle non-API error objects', () => {
      // Arrange
      const error = { someRandomField: 'value' };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.message).toBe('An error occurred');
      expect(result.original).toEqual(error);
    });

    it('should handle string errors', () => {
      // Arrange
      const error = 'String error message';

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.message).toBe('An error occurred');
    });

    it('should handle Error instances', () => {
      // Arrange
      const error = new Error('Test error');

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.message).toBe('Test error');
    });

    it('should preserve original error', () => {
      // Arrange
      const error = {
        response: {
          status: 400,
          data: { message: 'Bad request' },
        },
      };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.original).toBe(error);
    });

    it('should handle numeric error codes', () => {
      // Arrange
      const error = {
        response: {
          status: 400,
          data: {
            message: 'Error',
            code: 4001,
          },
        },
      };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.code).toBe(4001);
    });

    it('should handle 401 unauthorized errors', () => {
      // Arrange
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.status).toBe(401);
      expect(result.message).toBe('Unauthorized');
    });

    it('should handle 403 forbidden errors', () => {
      // Arrange
      const error = {
        response: {
          status: 403,
          data: { message: 'Forbidden' },
        },
      };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.status).toBe(403);
      expect(result.message).toBe('Forbidden');
    });

    it('should handle 500 server errors', () => {
      // Arrange
      const error = {
        response: {
          status: 500,
          data: { message: 'Internal server error' },
        },
      };

      // Act
      const result = parseApiError(error);

      // Assert
      expect(result.status).toBe(500);
      expect(result.message).toBe('Internal server error');
    });
  });

  describe('showApiErrorAlert', () => {
    it('should show alert for general error', async () => {
      // Arrange
      const error = {
        response: {
          status: 400,
          data: { message: 'Bad request' },
        },
      };
      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          buttons[0].onPress();
        },
      );

      // Act
      await showApiErrorAlert(error);

      // Assert
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Bad request',
        expect.any(Array),
        { cancelable: true },
      );
    });

    it('should show custom title when provided', async () => {
      // Arrange
      const error = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
      };
      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          buttons[0].onPress();
        },
      );

      // Act
      await showApiErrorAlert(error, { title: 'Custom Error' });

      // Assert
      expect(Alert.alert).toHaveBeenCalledWith(
        'Custom Error',
        'Not found',
        expect.any(Array),
        { cancelable: true },
      );
    });

    it('should handle 401 errors by clearing tokens', async () => {
      // Arrange
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };
      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          buttons[0].onPress();
        },
      );

      // Act
      await showApiErrorAlert(error);

      // Assert
      expect(storageService.removeItem).toHaveBeenCalledWith(
        StorageKeys.ACCESS_TOKEN,
      );
      expect(storageService.removeItem).toHaveBeenCalledWith(
        StorageKeys.REFRESH_TOKEN,
      );
      expect(Alert.alert).toHaveBeenCalledWith(
        'Session expired',
        'Unauthorized',
        expect.any(Array),
      );
    });

    it('should show retry button when onRetry is provided', async () => {
      // Arrange
      const error = {
        response: {
          status: 500,
          data: { message: 'Server error' },
        },
      };
      const onRetry = jest.fn();
      let retryButton: any;

      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          retryButton = buttons.find((b: any) => b.text === 'Retry');
          // Call OK to resolve
          buttons.find((b: any) => b.text === 'OK').onPress();
        },
      );

      // Act
      await showApiErrorAlert(error, { onRetry });

      // Assert
      expect(Alert.alert).toHaveBeenCalled();
      expect(retryButton).toBeDefined();

      // Test retry button
      retryButton.onPress();
      expect(onRetry).toHaveBeenCalled();
    });

    it('should handle async retry function', async () => {
      // Arrange
      const error = {
        response: {
          status: 500,
          data: { message: 'Server error' },
        },
      };
      const onRetry = jest.fn().mockResolvedValue(undefined);
      let retryButton: any;

      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          retryButton = buttons.find((b: any) => b.text === 'Retry');
          buttons.find((b: any) => b.text === 'OK').onPress();
        },
      );

      // Act
      await showApiErrorAlert(error, { onRetry });

      // Assert - execute retry
      await retryButton.onPress();
      expect(onRetry).toHaveBeenCalled();
    });

    it('should handle network errors with appropriate message', async () => {
      // Arrange
      const error = {
        request: {},
        message: 'Network Error',
      };
      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          buttons[0].onPress();
        },
      );

      // Act
      await showApiErrorAlert(error);

      // Assert
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Network error. Please check your connection.',
        expect.any(Array),
        { cancelable: true },
      );
    });

    it('should handle errors without retry callback', async () => {
      // Arrange
      const error = {
        response: {
          status: 400,
          data: { message: 'Bad request' },
        },
      };
      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          buttons[0].onPress();
        },
      );

      // Act
      await showApiErrorAlert(error);

      // Assert
      const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
      const buttons = alertCall[2];
      expect(buttons).toHaveLength(1);
      expect(buttons[0].text).toBe('OK');
    });

    it('should resolve promise when OK is pressed', async () => {
      // Arrange
      const error = {
        response: {
          status: 400,
          data: { message: 'Error' },
        },
      };
      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          // Simulate pressing OK
          setTimeout(() => buttons[0].onPress(), 0);
        },
      );

      // Act & Assert
      await expect(showApiErrorAlert(error)).resolves.toBeUndefined();
    });

    it('should not throw when storage operations fail during 401 handling', async () => {
      // Arrange
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };
      (storageService.removeItem as jest.Mock).mockRejectedValue(
        new Error('Storage error'),
      );
      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          buttons[0].onPress();
        },
      );

      // Act & Assert
      await expect(showApiErrorAlert(error)).resolves.toBeUndefined();
    });
  });
});
