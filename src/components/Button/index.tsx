import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from 'react-native';

import { THEME } from '../../utils/constant';
import { Text } from '../Text';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  outline?: boolean;
  disabled?: boolean;
  round?: boolean;
}

export function Button({
  title,
  buttonContainerStyle,
  buttonStyle,
  disabled,
  outline,
  round,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity {...{ disabled }} {...props} style={buttonContainerStyle}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: !disabled ? THEME.colors.PRIMARY : 'gainsboro',
            borderRadius: THEME.spaces.MD
          },
          outline && { backgroundColor: 'white', borderWidth: 0.7 },
          round && { borderRadius: THEME.spaces.XL },
          buttonStyle
        ]}>
        <Text style={{ color: THEME.colors.WHITE, fontWeight: 'bold' }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 45,
    marginVertical: 5
  }
});
