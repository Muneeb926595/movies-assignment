import { toast } from 'sonner-native';

class ToastService {
  showSuccess(message: string, duration?: number) {
    toast.success(message, {
      duration: duration || 3000,
    });
  }
  showError(message: string, duration?: number) {
    toast.error(message, {
      duration: duration || 3000,
    });
  }

  showInfo(message: string, duration?: number) {
    toast.info(message, {
      duration: duration || 3000,
    });
  }

  showWarning(message: string, duration?: number) {
    toast.warning(message, {
      duration: duration || 3000,
    });
  }

  show(message: string, duration?: number) {
    toast(message, {
      duration: duration || 3000,
    });
  }
}

export const toastService = new ToastService();
