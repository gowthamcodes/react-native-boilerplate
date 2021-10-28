import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useContext, useEffect } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../navigations/context/auth.context';
import { update_loading } from '../../redux/loading/loading.action';
import { IUser } from '../../types/misc/user.types';
import { OverlayLoading, Text } from '@components';
import { THEME } from '@utils/constant';

export default function DashboardScreen({
  navigation
}: StackScreenProps<any, any>) {
  const { sign_out } = useContext(AuthContext) as any;

  // States
  const menu_data = [
    {
      title: 'Menu',
      data: [
        {
          name: 'Test',
          icon: <FontAwesome5 name="luggage-cart" size={25} color="#4B4B4B" />,
          onPress: () => undefined
        }
      ]
    }
  ];

  // Redux
  const loading: boolean = useSelector((state: any) => state.loading);
  const user: Pick<IUser, 'userName' | 'access_token'> = useSelector(
    (state: any) => state.user
  );
  const app_configuration = useSelector(
    (state: any) => state.app_configuration
  );
  const dispatch = useDispatch();
  const dispatch_loading = useCallback(
    (state: boolean) => dispatch(update_loading(state)),
    [dispatch]
  );

  // Hooks
  useEffect(() => {
    console.log('no operation implemented yet');
  }, []);

  return (
    <>
      <View style={[styles.container, { padding: THEME.spaces.XL }]}>
        <ScrollView>
          <Text style={{ fontSize: 20, fontWeight: '700', marginVertical: 10 }}>
            Menu
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {menu_data
              .find((f) => f.title === 'Menu')
              ?.data.map((item, index) => (
                <View
                  key={`${item.name.replace(' ', '') + index}`}
                  style={{
                    width: '50%',
                    marginVertical: 10 / 2,
                    paddingHorizontal: 5
                  }}>
                  <TouchableOpacity
                    onPress={item.onPress}
                    style={[
                      {
                        marginLeft: index % 2 !== 0 ? 10 / 2 : 0,
                        marginRight: index % 2 !== 0 ? 0 : 10 / 2
                      },
                      {
                        backgroundColor: 'white',
                        height: 100,
                        flex: 1,
                        borderRadius: 20,
                        padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...Platform.select({
                          android: {
                            elevation: 5
                          },
                          ios: {
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 2
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84
                          }
                        })
                      }
                    ]}>
                    {item.icon}
                    <Text
                      style={{
                        marginTop: THEME.spaces.MD,
                        fontSize: 17,
                        // fontWeight: 'bold',
                        color: '#4B4B4B',
                        textAlign: 'center'
                      }}
                      numberOfLines={2}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
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
