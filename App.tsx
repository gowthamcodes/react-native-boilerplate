import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform, StatusBar, View
} from 'react-native';
import 'react-native-gesture-handler';
import { PERMISSIONS } from 'react-native-permissions';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Text } from './src/components';
import { FirmanAwesomeAlert } from './src/components/FirmanAwesomeAlert';
import RootNavigation from './src/navigations/root.navigation';
import { persistor, store } from './src/redux/store';
import { THEME } from './src/utils/constant';
import { CheckPermission } from './src/utils/permission';
import { ERROR_MESSAGE } from './src/utils/strings';

const App = () => {
  const [network, setNetwork] = useState<NetInfoState>();

  const ask_permission = async () => {
    if (Platform.OS === 'android') {
      await CheckPermission(PERMISSIONS.ANDROID.CAMERA);
    } else if (Platform.OS === 'ios') {
      await CheckPermission(PERMISSIONS.IOS.CAMERA);
    }
  }
  useEffect(() => {
    // Request for Permission
    ask_permission();
    const unsub_network_listener = NetInfo.addEventListener(setNetwork);
    return () => {
      unsub_network_listener();
    }
  }, [])

  return (
    <>
      <StatusBar translucent barStyle="dark-content" backgroundColor={"transparent"} />
      <Provider {...{ store }}>
        <PersistGate {...{ persistor }}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </PersistGate>
        <FirmanAwesomeAlert ref={(ref) => FirmanAwesomeAlert.setRef(ref)} />
      </Provider>
      {/* Showing this on the first hierachy so it will be displayed on top of any screen when there's no internet access */}
      {
        network && (
          <Modal
            visible={!network.isConnected}
            statusBarTranslucent
            transparent
            animationType="fade"
            style={{ flex: 1 }}
          >
            <View
              style={{
                flex: 1,
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: !network.isConnected
                  ? 'rgba(0,0,0,0.60)'
                  : 'transparent'
              }}>
              <View
                style={{
                  width: '90%',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 15
                }}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>No internet connection</Text>
                <Text style={{ marginBottom: 10 }}>{ERROR_MESSAGE.NO_INTERNET}</Text>
                <View style={{ borderBottomWidth: 0.7, borderColor: "gainsboro", marginBottom: 10 }} />
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ textAlign: "center", marginBottom: 10 }}>This message will close automatically when there is internet</Text>
                  <ActivityIndicator size="large" color={THEME.colors.BLACK} />
                  <Text style={{ fontSize: 13, textAlign: "center", marginTop: 10 }}>Waiting....</Text>
                </View>
              </View>
            </View>
          </Modal>
        )
      }
    </>
  );
};

export default App;