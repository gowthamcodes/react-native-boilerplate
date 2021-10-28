const ERROR_MESSAGE = {
  NO_INTERNET: 'No internet access at the moment, please try to reconnect.',
  UNAUTHORIZED: 'Session is invalid or may have been expired, please re-login.',
  INTERNAL_SERVER_ERROR: 'Internet server error.',
  SOMETHING_WENT_WRONG: 'Something went wrong.',
  UNABLE_TO_FIND_COMPANY:
    'Company is not found, please enter a valid company code.',
  NEW_PASSWORD_UNMATCH:
    'Password does not match, Please verify your new password.'
};

const MISC_MESSAGE = {
  SUCCESS_PASSWORD_CHANGED: 'Password has been successfully changed.',
  DISCARD_QUESTION: 'Are you sure you want to discard this?',
  DELETE_QUESTION: 'Are you sure you want to delete this item?',
  SUBMIT_QUESTION: 'Are you sure you want to submit this data?',
  SAVE_QUESTION: 'Are you sure you want to save this info?',
  CONFIRM_TEXT: 'OK',
  YES_TEXT: 'YES',
  CANCEL_TEXT: 'NO',
  SUBMIT_ITEM: 'Item has been submitted.'
};

const SCREEN_TITLE = {
  SETTINGS: 'Settings'
};

export { ERROR_MESSAGE, MISC_MESSAGE, SCREEN_TITLE };
