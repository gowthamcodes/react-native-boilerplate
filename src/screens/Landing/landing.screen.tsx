import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  View
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch, useSelector } from 'react-redux';
import { change_company_code } from '../../redux/app_configuration/app_configuration.action';
import { update_loading } from '../../redux/loading/loading.action';
import { ICompanyCodeType } from '../../types/misc/company_code.types';
import {
  Button,
  FirmanAwesomeAlert,
  OverlayLoading,
  Text,
  TextInput
} from '@components';
import { API_ROUTE, GATEWAY_URL, THEME, ERROR_MESSAGE,  } from '@utils';

export default function LandingScreen({
  navigation
}: StackScreenProps<any, any>) {
  // States
  const [company_code, setCompany_code] = useState('');
  const pan = React.useRef(new Animated.ValueXY()).current;

  // Redux
  const loading: boolean = useSelector((state: any) => state.loading);
  const dispatch = useDispatch();
  const dispatch_loading = useCallback(
    (state: boolean) => dispatch(update_loading(state)),
    [dispatch]
  );
  const dispatch_change_company_code = useCallback(
    (cc: string, cu: string) => dispatch(change_company_code(cc, cu)),
    [dispatch]
  );

  // Methods
  const verify_company_code = async (
    cc: string,
    onSuccess: (data: ICompanyCodeType) => void,
    onError: (e: any) => void
  ) => {
    dispatch_loading(true);
    try {
      const result = await axios({
        url: `${GATEWAY_URL}${API_ROUTE.COMPANY_CODE_ROUTE}`,
        method: 'GET',
        params: {
          CompanyCode: cc
        }
      });
      if (result?.data) {
        onSuccess(result.data);
      }
    } catch (e) {
      onError(e);
    } finally {
      dispatch_loading(false);
    }
  };

  // Hooks
  useEffect(() => {
    if (__DEV__) {
      setCompany_code('SMM01');
    }
  }, []);

  return (
    <>
      <View style={[styles.container, { padding: THEME.spaces.LG }]}>
        <Text
          style={{
            paddingVertical: THEME.spaces.XL,
            fontSize: 30,
            fontWeight: 'bold',
            color: THEME.colors.BLACK
          }}>
          ProjectName
        </Text>
        <View>
          <TextInput
            label="Enter company code"
            autoCapitalize="characters"
            autoFocus
            placeholder="Enter company code"
            onChangeText={setCompany_code}
            value={company_code}
            containerStyle={{
              backgroundColor: 'transparent',
              borderColor: 'gainsboro',
              borderWidth: 1
            }}
          />
          <Button
            disabled={company_code.length === 0}
            title="Verify"
            onPress={() => {
              verify_company_code(
                company_code,
                (data) => {
                  dispatch_change_company_code(company_code, data.CompanyUrl);
                  navigation.navigate('Login', {
                    company_config: {
                      company_code,
                      company_url: data.CompanyUrl
                    }
                  });
                },
                (e) => {
                  if (__DEV__) {
                    console.log(JSON.stringify(e, null, 2));
                  }
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
            }}
          />
        </View>
        {loading && <OverlayLoading />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: getStatusBarHeight()
  }
});
