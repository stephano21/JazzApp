import React, {useEffect} from 'react';
import {Animated, StyleProp, View, ViewStyle} from 'react-native';
import {useAnimation} from '../hooks/useAnimation';
import {colores, styles} from '../theme/appTheme';
import {ScrollView} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
interface Props {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
  isScroll?: boolean;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
}
export const BaseScreen = ({children, style = {}, isScroll = false, alignItems="center"}: Props) => {
  const isFocused = useIsFocused();
  const {fadeIn, opacity} = useAnimation();
  useEffect(() => {
    fadeIn(500);
  }, [isFocused]);
  return (
    <Animated.View
      style={{
        opacity,
        flex: 1,
        backgroundColor: colores.background,
      }}>
      {isScroll ? (
        <ScrollView
          contentContainerStyle={{
            alignItems: alignItems,
            padding: 20,
            ...(style as any),
          }}>
          {children}
        </ScrollView>
      ) : (
        <View
          style={{
            alignItems: alignItems,
            ...styles.globalmargin,
            ...(style as any),
          }}>
          {children}
        </View>
      )}
    </Animated.View>
  );
};
