import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import {
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VersionNumber from 'react-native-version-number';
import { useDispatch, useSelector } from 'react-redux';
import { change_company_code } from '../../redux/app_configuration/app_configuration.action';
import { update_loading } from '../../redux/loading/loading.action';
import { ICompanyCodeType } from '../../types/misc/company_code.types';

import {
  FirmanAwesomeAlert,
  OverlayLoading,
  Text,
  TextInput
} from '@components';
import { API_ROUTE, GATEWAY_URL, THEME, ERROR_MESSAGE, SCREEN_TITLE, lazy_error_helper } from '@utils';

export default function LoginSettingScreen({
  navigation
}: StackScreenProps<any, any>) {
  const app_configuration: { company_code: string } = useSelector(
    (state: any) => state.app_configuration
  );
  const [version_modal, setVersion_modal] = useState(false);
  const [company_modal, setCompany_modal] = useState(false);
  const [company_code, setCompany_code] = useState(
    app_configuration.company_code ? app_configuration.company_code : ''
  );

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
      // stop loading when async event is completed
      dispatch_loading(false);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: THEME.colors.PRIMARY,
          paddingTop: getStatusBarHeight()
        }}>
        <View
          style={{
            padding: 10
          }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: THEME.colors.WHITE,
                borderRadius: 30,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 5,
                paddingRight: 10
              }}>
              <MaterialIcons
                name="arrow-back"
                size={30}
                style={{ paddingRight: 1 }}
              />
              <Text style={{ paddingRight: 5 }}>Back</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: THEME.colors.WHITE,
              marginTop: THEME.spaces.XL * 1.5
            }}>
            {SCREEN_TITLE.SETTINGS}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: THEME.colors.WHITE,
            borderTopLeftRadius: THEME.spaces.XL,
            borderTopRightRadius: THEME.spaces.XL,
            padding: THEME.spaces.XL
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
            onPress={() => setCompany_modal(true)}>
            <View
              style={{
                backgroundColor: 'rgba(137, 86, 222, 0.45)',
                padding: 10,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 20
              }}>
              <Ionicons name="home" size={35} color={THEME.colors.PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold'
                }}>
                Company Code
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 3
                }}>
                {app_configuration.company_code
                  ? app_configuration.company_code
                  : ''}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginVertical: 10,
              borderBottomWidth: 0.7,
              borderColor: THEME.colors.GRAY
            }}
          />

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
            onPress={() => setVersion_modal(true)}>
            <View
              style={{
                backgroundColor: 'rgba(137, 86, 222, 0.45)',
                padding: 10,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 20
              }}>
              <Ionicons
                name="ios-phone-portrait-outline"
                size={35}
                color={THEME.colors.PRIMARY}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold'
                }}>
                App Info
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 3
                }}>
                v{VersionNumber.appVersion}.{VersionNumber.buildVersion}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Version Modal */}
      <Modal
        visible={version_modal}
        style={{ flex: 1 }}
        animationType="fade"
        transparent
        statusBarTranslucent
        onRequestClose={() => setVersion_modal(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setVersion_modal(false)}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: version_modal
              ? THEME.colors.BLACK_TRANSPARENT
              : 'transparent'
          }}>
          <TouchableHighlight
            style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 15
            }}>
            <View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  ProjectName App
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Version: </Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    {VersionNumber.appVersion}.{VersionNumber.buildVersion}
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      lineHeight: 25,
                      fontSize: 15
                    }}>
                    Copyright (c) {new Date().getFullYear()} - Adaptive Cloud
                    Systems Pte Ltd
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      textAlign: 'center',
                      lineHeight: 25,
                      fontSize: 15
                    }}>
                    All Rights Reserved
                  </Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </TouchableOpacity>
      </Modal>

      {/* Company Code Modal */}
      <Modal
        visible={company_modal}
        style={{ flex: 1 }}
        animationType="fade"
        transparent
        statusBarTranslucent
        onRequestClose={() => setCompany_modal(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setCompany_modal(false)}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: company_modal
              ? THEME.colors.BLACK_TRANSPARENT
              : 'transparent'
          }}>
          <TouchableHighlight
            style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 15
            }}>
            <View>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18
                  }}>
                  Enter company code
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      value={company_code}
                      onChangeText={setCompany_code}
                      autoCapitalize="characters"
                      autoFocus
                      placeholder="Enter company code"
                    />
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: THEME.colors.PRIMARY,
                        paddingHorizontal: THEME.spaces.XL - 2,
                        paddingVertical: THEME.spaces.LG,
                        borderRadius: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      onPress={() => {
                        setCompany_modal(false);
                        verify_company_code(
                          company_code,
                          async (data) => {
                            await dispatch_change_company_code(
                              company_code,
                              data.CompanyUrl
                            );
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
                                lazy_error_helper(
                                  ERROR_MESSAGE.UNABLE_TO_FIND_COMPANY
                                )
                              );
                            } else {
                              FirmanAwesomeAlert.show(
                                lazy_error_helper(
                                  ERROR_MESSAGE.INTERNAL_SERVER_ERROR
                                )
                              );
                            }
                          }
                        );
                      }}>
                      <FontAwesome
                        name="chevron-right"
                        color={THEME.colors.WHITE}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </TouchableOpacity>
      </Modal>
      {loading && <OverlayLoading />}
    </>
  );
}
