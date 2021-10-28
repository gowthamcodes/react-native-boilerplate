import React, { ReactNode, Ref, RefObject } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  View,
  ViewStyle,
  Platform
} from 'react-native';
import { THEME } from '../../utils/constant';
import { Text } from '../Text';

export interface TextInputProps extends RNTextInputProps {
  icon?: () => ReactNode;
  iconPosition?: 'left' | 'right';
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  caption?: string;
  captionColor?: string;
  captionStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  inputRef?: RefObject<RNTextInput>;
}

export function TextInput({
  label,
  labelStyle,
  caption,
  captionColor = 'black',
  captionStyle,
  containerStyle,
  textInputStyle,
  icon,
  iconPosition = 'right',
  inputRef,
  ...props
}: TextInputProps) {
  return (
    <View style={{ marginVertical: 5 }}>
      {label && (
        <View style={[styles.label_container, { marginBottom: 5 }]}>
          <Text style={[labelStyle, { fontWeight: '600' }]}>{label}</Text>
        </View>
      )}
      <View
        style={[
          styles.container,
          {
            borderRadius: THEME.spaces.MD,
            backgroundColor: '#E8E8E8',
            ...Platform.select({
              android: {
                paddingHorizontal: 10
              },
              ios: {
                padding: 20
              }
            })
          },
          containerStyle
        ]}>
        {icon && iconPosition === 'left' && (
          <View style={{ justifyContent: 'center', marginLeft: 5 }}>
            {icon()}
          </View>
        )}
        <RNTextInput
          ref={inputRef}
          style={[{ flex: 1 }, textInputStyle]}
          underlineColorAndroid="transparent"
          placeholderTextColor={'slategray'}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <View style={{ justifyContent: 'center', marginRight: 5 }}>
            {icon()}
          </View>
        )}
      </View>
      {caption && (
        <View
          style={[
            styles.label_container,
            {
              marginTop: 5
            }
          ]}>
          <Text style={[captionStyle, { fontSize: 13, fontWeight: 'bold' }]}>
            {caption}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  label_container: {
    marginLeft: 2
  }
});
