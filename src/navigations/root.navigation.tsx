import React, { useCallback, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  authenticate_user,
  deauthenticate_user,
  set_login
} from '../redux/user/user.action';
import LandingScreen from '../screens/Landing/landing.screen';
import LoginScreen from '../screens/Login/login.screen';
import LoginSettingScreen from '../screens/LoginSetting/loginsetting.screen';
import DashboardScreen from '../screens/Dashboard/dashboard.screen';
import ProfileScreen from '../screens/Profile/profile.screen';
import { IUser } from '../types/misc/user.types';
import AuthContext from './context/auth.context';

const Stack = createStackNavigator();

export default function RootNavigation() {
  // Redux
  const user: IUser = useSelector((state: any) => state.user);
  const app_configuration: { company_code: string } = useSelector(
    (state: any) => state.app_configuration
  );
  const isloggedin = useSelector((state: any) => state.isloggedin);

  const dispatch = useDispatch();
  const dispatch_authentication = useCallback(
    (
      username,
      password,
      company_code,
      company_url,
      is_remember,
      onSuccess: (data: IUser) => void,
      onError: (e: any) => void
    ) => {
      dispatch(
        authenticate_user(
          {
            username,
            password,
            company_code,
            company_url,
            is_remember
          },
          onSuccess,
          onError
        )
      );
    },
    [dispatch]
  );
  const dispatch_deauthenticate = useCallback(() => {
    dispatch(deauthenticate_user());
  }, [dispatch]);
  const dispatch_set_login = useCallback(() => {
    dispatch(set_login(true));
  }, [dispatch]);

  // Hooks
  const auth_context = React.useMemo(
    () => ({
      signIn: async (
        username: string,
        password: string,
        company_code: string,
        company_url: string,
        is_remember: boolean,
        onSuccess: () => void,
        onError: (e: any) => void
      ) => {
        dispatch_authentication(
          username,
          password,
          company_code,
          company_url,
          is_remember,
          onSuccess,
          onError
        );
      },
      sign_out: () => {
        dispatch_deauthenticate();
      }
    }),
    []
  );

  useEffect(() => {
    if (user?.is_remember) {
      dispatch_set_login();
    }
  }, []);

  return (
    <AuthContext.Provider value={auth_context}>
      <Stack.Navigator
        screenOptions={{
          // headerBackTitle: 'Back'
          headerShown: false
        }}>
        {/*  User Token, Id, Company Details and Login State are all not initialize */}
        {user === null &&
          app_configuration.company_code === null &&
          !isloggedin ? (
          <>
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{
                gestureEnabled: false
              }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="LoginSetting" component={LoginSettingScreen} />
          </>
        ) : // User Token, Id are null but Company Details is initialize and Login State is false
          user === null && app_configuration.company_code && !isloggedin ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="LoginSetting" component={LoginSettingScreen} />
            </>
          ) : // User Token, Id and Company Details are NOT null but Remember Me is set as false and Login State is false
            user !== null &&
              app_configuration.company_code &&
              user.is_remember === false &&
              !isloggedin ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="LoginSetting" component={LoginSettingScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
              </>
            )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
