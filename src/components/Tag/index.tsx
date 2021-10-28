import React from 'react';
import { Platform, StyleProp, Text, ViewStyle } from 'react-native';
import { THEME } from '../../utils/constant';

interface TagProps {
  text: string | number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export function Tag({
  text,
  style,
  color: backgroundColor = THEME.colors.PRIMARY
}: TagProps) {
  return (
    <Text
      style={[
        {
          textAlign: 'center',
          fontWeight: 'bold',
          color: THEME.colors.WHITE,
          backgroundColor,
          paddingVertical: THEME.spaces.SM - 2,
          paddingHorizontal: THEME.spaces.LG,
          borderRadius: THEME.spaces.LG,
          ...Platform.select({
            ios: {
              overflow: 'hidden'
            }
          })
        },
        style
      ]}>
      {text}
    </Text>
  );
}
