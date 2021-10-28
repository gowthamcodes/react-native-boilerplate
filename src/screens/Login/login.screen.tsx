import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,

  StyleSheet,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../navigations/context/auth.context';
import { update_loading } from '../../redux/loading/loading.action';
import { ICompanyDetail } from '../../types/misc/company_detail.types';

import {
  Button,
  CheckBox,
  FirmanAwesomeAlert,
  OverlayLoading,
  Text,
  TextInput
} from '@components';
import { API_ROUTE, THEME,ERROR_MESSAGE, lazy_error_helper } from '@utils';

export default function LoginScreen({
  navigation,
  route
}: StackScreenProps<any, any>) {
  // State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember_me, setRemember_me] = useState(false);

  const [header_height, setHeader_height] = useState(0);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [company_detail, setCompany_detail] = useState<ICompanyDetail | null>(
    null
  );
  const { signIn } = React.useContext(AuthContext) as any;

  // Redux
  const loading: boolean = useSelector((state: any) => state.loading);
  const app_configuration: {
    company_code: string;
    company_url: string;
  } = useSelector((state: any) => state.app_configuration);

  const dispatch = useDispatch();
  const dispatch_loading = useCallback(
    (state: boolean) => dispatch(update_loading(state)),
    [dispatch]
  );

  // Methods
  const get_company_detail = async (
    {
      company_url,
      company_code
    }: { company_url: string; company_code: string },
    onSuccess: (data: ICompanyDetail) => void,
    onError: (e: any) => void
  ) => {
    dispatch_loading(true);
    try {
      const result = await axios({
        url: `${company_url}${API_ROUTE.COMPANY_CODE_ROUTE}`,
        method: 'GET',
        params: {
          code: company_code
        }
      });

      if (result?.data) {
        onSuccess(result.data);
      }
    } catch (e) {
      onError(e);
    } finally {
      // stop loading when async event is completed
      dispatch_loading(false);
    }
  };

  // Hooks
  useEffect(() => {
    if (__DEV__) {
      setUsername('firman');
      setPassword('Admin*123');
    }
  }, []);

  useEffect(() => {
    const company_config: {
      company_code: string;
      company_url: string;
    } = route.params?.company_config;

    const unsubscribe = navigation.addListener('focus', async () => {
      setCompany_detail(null);
      await get_company_detail(
        {
          company_url: company_config?.company_url
            ? company_config.company_url
            : app_configuration.company_url,
          company_code: company_config?.company_code
            ? company_config.company_code
            : app_configuration.company_code
        },
        (data) => {
          setCompany_detail(data);
        },
        (e) => {
          if (e.response?.status === 400) {
            FirmanAwesomeAlert.show(
              lazy_error_helper(ERROR_MESSAGE.UNABLE_TO_FIND_COMPANY)
            );
          } else {
            FirmanAwesomeAlert.show(
              lazy_error_helper(ERROR_MESSAGE.INTERNAL_SERVER_ERROR)
            );
          }
        }
      );
    });
    return unsubscribe;
  }, [navigation, route]);

  return (
    <>
      <View style={[styles.container, { padding: THEME.spaces.XL }]}>
        <KeyboardAvoidingView behavior={'padding'}>
          <View style={{}}>
            {company_detail ? (
              <Text
                style={{
                  paddingVertical: THEME.spaces.XL,
                  color: THEME.colors.BLACK,
                  fontSize: 23,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  lineHeight: 35
                }}>
                {company_detail.Name}
              </Text>
            ) : (
              <ActivityIndicator size="small" color={THEME.colors.BLACK} />
            )}
          </View>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: THEME.colors.WHITE
            }}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              label="Username"
              onChangeText={setUsername}
              value={username}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'gainsboro',
                borderWidth: 1
              }}
              icon={() => <Fontisto name="email" size={18} />}
            />
            <TextInput
              label="Password"
              onChangeText={setPassword}
              value={password}
              {...{ secureTextEntry }}
              icon={() => (
                <TouchableOpacity
                  onPress={() => {
                    setSecureTextEntry((prev) => !prev);
                  }}>
                  <Entypo
                    name={secureTextEntry ? 'eye-with-line' : 'eye'}
                    size={18}
                  />
                </TouchableOpacity>
              )}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'gainsboro',
                borderWidth: 1
              }}
            />
            <CheckBox
              checkColor={THEME.colors.PRIMARY}
              value={remember_me}
              onCheck={(value) => setRemember_me(value)}
              label="Remember Me"
            />
            <Button
              disabled={username.length === 0 || password.length === 0}
              title={'Sign in'}
              onPress={() => {
                signIn(
                  username,
                  password,
                  app_configuration.company_code,
                  app_configuration.company_url,
                  remember_me,
                  () => {
                    navigation.navigate('Dashboard');
                  },
                  (e: any) => {
                    if (e.response?.status === 400) {
                      FirmanAwesomeAlert.show(
                        lazy_error_helper(e.response.data.error_description)
                      );
                    } else {
                      FirmanAwesomeAlert.show(
                        lazy_error_helper(ERROR_MESSAGE.INTERNAL_SERVER_ERROR)
                      );
                    }
                  }
                );
              }}
            />
          </View>
        </KeyboardAvoidingView>
        {loading && <OverlayLoading />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.WHITE,
    paddingTop: getStatusBarHeight()
  }
});
