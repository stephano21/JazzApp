import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseModal, BaseModalProps } from './BaseModal';
import { ButtonWithText } from '../components/BaseComponents/ButtonWithText';
import { colores, styles } from '../theme/appTheme';
import { ScrollView } from 'react-native-gesture-handler';

interface Props extends BaseModalProps {
  children: JSX.Element | JSX.Element[];
  butons?: JSX.Element | JSX.Element[];
  isScroll?: boolean;
  title?: string;
}

export const BaseViewModal = ({
  CloseFunction,
  isVisible,
  children,
  butons,
  title,
  isScroll = false,
}: Props) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  return (
    <BaseModal CloseFunction={CloseFunction} isVisible={isVisible}>
      {isScroll ? (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            //flex: 1,
            ...styles.sombra,
            padding: 20,
          }}
          onLayout={event =>
            setDimensions({
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height,
            })
          }>
            {title && (
            <View style={HeaderStyle.Header}>

              <Text style={HeaderStyle.Texto}>{title}</Text>
            </View>

          )}

          {children}
        </ScrollView>
      ) : (
        <View
          style={{
            ...styles.globalmargin,
            ...styles.sombra,

          }}
          onLayout={event =>
            setDimensions({
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height,
            })
          }>
          {title && (
            <View style={HeaderStyle.Header}>

              <Text style={HeaderStyle.Texto}>{title}</Text>
            </View>

          )}

          {children}
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          top: dimensions.height - 50,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ButtonWithText

            color={colores.primario}
            anyfunction={CloseFunction}
            width={100}
            title={'Cerrar'}></ButtonWithText>
          {butons}
        </View>
      </View>
    </BaseModal>
  );
};
const HeaderStyle = StyleSheet.create({
  Header: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
    padding: 20,

  },
  Texto: {
    color: colores.negro,
    fontSize: 20,
    fontFamily: "Arial",
    fontWeight: 'bold',
  },
});