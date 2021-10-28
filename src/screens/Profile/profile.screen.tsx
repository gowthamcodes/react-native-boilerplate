import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import axios, { AxiosError } from 'axios';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../navigations/context/auth.context';
import { update_loading } from '../../redux/loading/loading.action';
import { update_user } from '../../redux/user/user.action';
import { IProfilePasswordChange } from '../../types/misc/passwordchange.types';
import { IProfile } from '../../types/misc/profile.types';
import { IUser } from '../../types/misc/user.types';

import { FirmanAwesomeAlert } from '@components';
import { API_ROUTE, THEME, ERROR_MESSAGE, MISC_MESSAGE, lazy_error_helper } from '@utils';

export default function ProfileScreen({
  navigation
}: StackScreenProps<any, any>) {
  // States
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [password_modal, setpassword_modal] = useState(false);
  const [password_reset, setpassword_reset] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: ''
  });
  const { sign_out } = useContext(AuthContext) as any;

  // Redux
  const loading: boolean = useSelector((state: any) => state.loading);
  const user: Pick<
    IUser,
    'access_token' | 'userName' | 'is_remember'
  > = useSelector((state: any) => state.user);
  const app_configuration: {
    company_code: string;
    company_url: string;
  } = useSelector((state: any) => state.app_configuration);

  const dispatch = useDispatch();
  const dispatch_loading = useCallback(
    (state: boolean) => dispatch(update_loading(state)),
    [dispatch]
  );
  const dispatch_update_user = useCallback(
    (is_remember: boolean) => dispatch(update_user({ is_remember })),
    [dispatch]
  );

  // Methods
  const get_user_profile_info = async (
    onLoading: (state: boolean) => void,
    onSuccess: (data: IProfile) => void,
    onError: (error: any) => void
  ) => {
    onLoading(true);
    try {
      const result = await axios({
        url: `${app_configuration.company_url}${API_ROUTE.PROFILE_ROUTE}`,
        method: 'get',
        params: {
          user_name: user?.userName.split('_')[1]
        },
        headers: {
          Authorization: `Bearer ${user?.access_token}`
        }
      });

      if (result?.data) {
        onSuccess(result.data.user);
      }
    } catch (e) {
      onError(e);
    } finally {
      onLoading(false);
    }
  };

  const post_password_change = async (
    {
      user_name,
      oldpassword,
      newPassword
    }: {
      user_name: string;
      oldpassword: string;
      newPassword: string;
    },
    onLoading: (state: boolean) => void,
    onSuccess: (data: IProfilePasswordChange) => void,
    onError: (error: AxiosError) => void
  ) => {
    onLoading(true);
    try {
      const result = await axios({
        url: `${app_configuration.company_url}${API_ROUTE.PROFILE_CHANGE_PASSWORD}`,
        method: 'post',
        params: {
          user_name,
          oldpassword,
          newPassword
        },
        headers: {
          Authorization: `Bearer ${user?.access_token}`
        }
      });

      if (result?.data) {
        onSuccess(result.data);
      }
    } catch (e) {
      onError(e);
    } finally {
      onLoading(false);
    }
  };

  const validate_and_submit_password_request = async () => {
    const {
      current_password: oldpassword,
      new_password: newPassword,
      confirm_new_password
    } = password_reset;

    if (newPassword !== confirm_new_password) {
      FirmanAwesomeAlert.show(
        lazy_error_helper(ERROR_MESSAGE.NEW_PASSWORD_UNMATCH)
      );
    } else {
      await post_password_change(
        {
          user_name: user?.userName.split('_')[1],
          oldpassword,
          newPassword
        },
        dispatch_loading,
        (data) => {
          if (data.message === 'success') {
            FirmanAwesomeAlert.show({
              message: MISC_MESSAGE.SUCCESS_PASSWORD_CHANGED,
              confirmText: MISC_MESSAGE.CONFIRM_TEXT,
              showCancelButton: false,
              onConfirmPressed: () => {
                setpassword_modal(false);
                setpassword_reset({
                  current_password: '',
                  new_password: '',
                  confirm_new_password: ''
                });
              }
            });
          }
        },
        (e) => {
          if (__DEV__) {
            console.log(JSON.stringify(e, null, 2));
          }
          if (e.response?.status === 400) {
            FirmanAwesomeAlert.show(
              lazy_error_helper(e.response?.data.Message)
            );
          } else if (e.response?.status === 401) {
            FirmanAwesomeAlert.show(
              lazy_error_helper(ERROR_MESSAGE.UNAUTHORIZED, () => {
                sign_out();
              })
            );
          } else {
            FirmanAwesomeAlert.show(
              lazy_error_helper(ERROR_MESSAGE.INTERNAL_SERVER_ERROR)
            );
          }
        }
      );
    }
  };

  // Hooks
  useEffect(() => {
    get_user_profile_info(
      dispatch_loading,
      (data) => {
        setProfile(data);
      },
      (e: AxiosError) => {
        if (__DEV__) {
          console.log(e);
        }
        if (e.response?.status === 400) {
          FirmanAwesomeAlert.show(lazy_error_helper(e.response?.data.Message));
        } else if (e.response?.status === 401) {
          FirmanAwesomeAlert.show(
            lazy_error_helper(ERROR_MESSAGE.UNAUTHORIZED, () => {
              sign_out();
            })
          );
        } else {
          FirmanAwesomeAlert.show(
            lazy_error_helper(ERROR_MESSAGE.INTERNAL_SERVER_ERROR)
          );
        }
      }
    );
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.WHITE
  }
});
