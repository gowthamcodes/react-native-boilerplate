import { AnyAction } from 'redux';
import C from './app_configuration.constant';

export const app_configuration = (
  state: {
    company_code: string | null;
    company_url: string | null;
  } = {
    company_code: null,
    company_url: null
  },
  action: AnyAction
) => {
  switch (action.type) {
    case C.CHANGE_COMPANY_CODE: {
      let _state = JSON.parse(JSON.stringify(state));
      _state = action.payload;
      return _state;
    }
    default: {
      return state;
    }
  }
};
