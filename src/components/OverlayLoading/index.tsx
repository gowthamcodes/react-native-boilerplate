import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { THEME } from '../../utils/constant';

export function OverlayLoading() {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          flex: 1,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: THEME.colors.WHITE,
          opacity: 0.7,
          zIndex: 1
        }}>
        <ActivityIndicator
          size={'large'}
          color={THEME.colors.BLACK}
          style={{ marginBottom: 10 }}
        />
        {/* <View
          style={{
            backgroundColor: THEME.colors.WHITE,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <ActivityIndicator size={'large'} color="#2b2d2f" style={{ marginBottom: 10 }} />
          <Text>Please wait...</Text>
        </View> */}
      </View>
    </>
  );
}
