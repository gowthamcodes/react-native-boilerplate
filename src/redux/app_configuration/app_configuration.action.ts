import { Dispatch } from 'redux';
import C from './app_configuration.constant';

export const change_company_code = (cc: string, cu: string) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: C.CHANGE_COMPANY_CODE,
    payload: {
      company_code: cc,
      company_url: cu
    }
  });
};
