import axios from 'axios';
import { Dispatch } from 'redux';
import { IUser } from '../../types/misc/user.types';
import { API_ROUTE } from '../../utils/constant';
import { update_loading } from '../loading/loading.action';
import C from './user.constant';

interface authenticate_user_input {
  username: string;
  password: string;
  company_url: string;
  company_code: string;
  is_remember: boolean;
}

export const authenticate_user = (
  {
    username,
    password,
    company_url,
    company_code,
    is_remember
  }: authenticate_user_input,
  onSuccess: (data: IUser) => void,
  onError: (error: any) => void
) => async (dispatch: Dispatch) => {
  dispatch(update_loading(true));

  try {
    const form_data = new URLSearchParams();
    form_data.append('grant_type', 'password');
    form_data.append('UserName', `${company_code.toLowerCase()}_${username}`),
      form_data.append('Password', password);

    const result = await axios({
      url: `${company_url}${API_ROUTE.AUTHENTICATE}`,
      method: 'post',
      data: form_data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      timeoutErrorMessage: 'Server is unreachable at the moment.'
    });

    if (result?.data) {
      dispatch({
        type: C.AUTH_USER,
        payload: {
          access_token: result.data.access_token,
          userName: result.data.userName,
          userId: result.data.userId,
          is_remember
        } as IUser
      });
      dispatch(set_login(true));
      onSuccess(result.data);
    } else {
      onError(result);
    }
  } catch (e) {
    onError(e);
  } finally {
    dispatch(update_loading(false));
  }
};

export const update_user = (data: Partial<IUser>) => (dispatch: Dispatch) => {
  dispatch({
    type: C.UPDATE_USER,
    payload: data
  });
};

export const deauthenticate_user = () => (dispatch: Dispatch) => {
  dispatch({
    type: C.DEAUTH_USER
  });
  dispatch(set_login(false));
};

export const set_login = (state: boolean) => ({
  type: C.SET_LOGIN,
  payload: state
});
