import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { THEME } from '../../utils/constant';
import { Divider } from '../Divider';

interface RadioPickerProps {
  value:
    | {
        value: string | number;
        label: string;
      }
    | undefined;
  data: Array<{
    value: string | number;
    label: string;
  }>;
  onSelect: (data: { value: string | number; label: string }) => void;
  style?: StyleProp<ViewStyle>;
  includeDivider?: boolean;
}

export function RadioPicker({
  value,
  data,
  onSelect,
  style,
  includeDivider = false
}: RadioPickerProps) {
  return (
    <View style={[style]}>
      {data.map((d, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() => onSelect(d)}
            style={{
              marginTop: index !== 0 ? THEME.spaces.MD : undefined
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              {/* Icon */}
              <Fontisto
                name={
                  value?.value === d.value
                    ? 'radio-btn-active'
                    : 'radio-btn-passive'
                }
                style={{ marginRight: 5 }}
                size={20}
                color={THEME.colors.PRIMARY}
              />
              <Text style={{ flex: 1 }}>{d.label}</Text>
            </View>
          </TouchableOpacity>
          {index !== data.length - 1 && includeDivider && (
            <View style={{ marginTop: THEME.spaces.MD }}>
              <Divider />
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
