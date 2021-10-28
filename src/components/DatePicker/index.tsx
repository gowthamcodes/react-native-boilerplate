import React, { FC, ReactNode, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  Platform,
  TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Text } from '../Text';

export interface DatePickerProps {
  icon?: () => ReactNode;
  iconPosition?: 'left' | 'right';
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  caption?: string;
  captionColor?: string;
  captionStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  date: Date | null;
  setDate: (date: Date) => void;
}

export function DatePicker({
  date,
  setDate,
  label,
  labelStyle,
  caption,
  captionColor = 'black',
  captionStyle,
  containerStyle,
  icon,
  iconPosition = 'right',
  ...props
}: DatePickerProps) {
  const [mode, setMode] = useState<'date' | 'time' | undefined>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: Event, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date || new Date();
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time' | undefined) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{ marginVertical: 5 }}>
      {label && (
        <View style={[styles.label_container, { marginBottom: 5 }]}>
          <Text style={[labelStyle, { fontWeight: '600' }]}>{label}</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          setShow(true);
        }}
        style={[
          styles.container,
          {
            borderRadius: 5,
            backgroundColor: '#f0f2f1',
            ...Platform.select({
              android: {
                padding: 15
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
        <Text>
          {date ? moment(date).format('DD MMMM YYYY') : 'Date is not selected'}
        </Text>
        {show && (
          <DateTimePicker
            value={date || new Date()}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            style={[{ flex: 1 }]}
            {...props}
          />
        )}
        {icon && iconPosition === 'right' && (
          <View style={{ justifyContent: 'center', marginRight: 5 }}>
            {icon()}
          </View>
        )}
      </TouchableOpacity>
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
    flexDirection: 'row'
  },
  label_container: {
    marginLeft: 2
  }
});
