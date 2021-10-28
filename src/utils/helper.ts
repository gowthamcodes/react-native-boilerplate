import { ERROR_MESSAGE, MISC_MESSAGE } from './strings';

interface lazy_helper_return_type {
  message: string;
  confirmText: string;
  showCancelButton: boolean;
  onConfirmPressed: () => void | undefined;
}

const lazy_error_helper = (
  message: string,
  onConfirm?: () => void
): lazy_helper_return_type => {
  return {
    message,
    confirmText: MISC_MESSAGE.CONFIRM_TEXT,
    onConfirmPressed: onConfirm ? onConfirm : () => undefined,
    showCancelButton: false
  };
};

export { lazy_error_helper };
