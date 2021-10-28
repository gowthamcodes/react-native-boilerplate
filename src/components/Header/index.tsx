import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface HeaderProps {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  bottomHeaderComponent?: ReactNode;
  title: string;
}

export function Header({
  leftComponent,
  rightComponent,
  bottomHeaderComponent,
  title
}: HeaderProps) {
  return <View></View>;
}
