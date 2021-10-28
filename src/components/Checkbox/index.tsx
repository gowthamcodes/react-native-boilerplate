import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../../utils/constant';

interface CheckBoxProps {
  label: string;
  checkColor?: string;
  value: boolean;
  onCheck: (value: boolean) => void;
}

export function CheckBox({
  label = 'Check me up xoxo',
  checkColor = 'gainsboro',
  value,
  onCheck
}: CheckBoxProps) {
  return (
    <View style={{ marginVertical: THEME.spaces.SM }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            onCheck(value ? false : true);
          }}>
          <MaterialCommunityIcons
            name={!value ? 'checkbox-blank-outline' : 'checkbox-marked'}
            color={checkColor}
            size={30}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Text>{label}</Text>
        </View>
      </View>
    </View>
  );
}
