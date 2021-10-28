import React, { useState } from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { THEME } from '../../utils/constant';
import { Text } from '../Text';

interface PickerProps {
  value:
    | {
        value: string | number;
        label: string;
      }
    | undefined;
  data: { label: string; value: string | number }[];
  onSelect: (value: any) => void;
  title?: string;
}

export function Picker({
  value: select_item,
  data,
  onSelect,
  title
}: PickerProps) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <View
        style={{
          borderRadius: THEME.spaces.MD,
          backgroundColor: '#E8E8E8',
          justifyContent: 'center',
          ...Platform.select({
            android: {
              height: 50
            },
            ios: {
              height: 60
            }
          }),
          ...Platform.select({
            ios: {
              marginTop: 5
            }
          }),
          marginBottom: 5
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          onPress={() => setModal(true)}>
          <Text>
            {select_item === null || select_item === undefined
              ? 'Select item'
              : data.find((d) => d.value === select_item.value)?.label}
          </Text>
          <AntDesign name="caretdown" color={'#444'} />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modal}
        style={{ flex: 1 }}
        transparent
        statusBarTranslucent
        onRequestClose={() => setModal(false)}>
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            backgroundColor: modal ? 'rgba(0,0,0,0.5)' : 'transparent'
          }}>
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <View
              style={{
                width: '90%',
                maxHeight: '75%',
                backgroundColor: 'white',
                borderRadius: 10,
                overflow: 'visible'
              }}>
              <View
                style={{
                  paddingTop: 15,
                  paddingHorizontal: 15,
                  paddingBottom: 5
                }}>
                {title && (
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {title}
                  </Text>
                )}
              </View>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1, padding: 15 }}
                showsVerticalScrollIndicator
                indicatorStyle={'black'}>
                {data &&
                  data.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{ paddingVertical: 10 }}
                      onPress={() => {
                        onSelect(item);
                        setModal(false);
                      }}>
                      <Text style={{ fontSize: 17 }}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
              {/* <FlatList
                                // showsVerticalScrollIndicator={false}
                                style={{ flexGrow: 1, padding: 15, marginBottom: 30 }}
                                data={data}
                                keyExtractor={(item) => `${item.value}`}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            style={{ marginVertical: 10 }}
                                            onPress={() => {
                                                onSelect(item);
                                                setModal(false);
                                            }}>
                                            <Text style={{ fontSize: 17 }}>{item.label}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            /> */}
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    </>
  );
}
