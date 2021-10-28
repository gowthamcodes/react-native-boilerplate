import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Platform,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

interface CardProps extends TouchableOpacityProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, style, ...props }: CardProps) {
  return (
    <TouchableOpacity
      disabled={props.onPress === undefined}
      style={[
        {
          padding: 10,
          marginVertical: 5,
          backgroundColor: 'white',
          borderRadius: 10,
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
        },
        style
      ]}
      {...props}>
      {children}
    </TouchableOpacity>
  );
}
