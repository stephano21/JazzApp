import React, {useState} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {colores, styles} from '../../../theme/appTheme';
import {BaseModal, BaseModalProps} from '../../../Template/BaseModal';

export type AlertTitleType =
  | 'Aviso'
  | 'Error'
  | 'Exito'
  | 'Informacion'
  | 'Cerrar Sesión'
  | 'Guardado'
  | 'Enviado';

export interface BaseAlertProps extends BaseModalProps {
  title?: AlertTitleType;
  message: string;
  children?: JSX.Element | JSX.Element[];
}
export const AlertBaseModal = ({
  title = 'Aviso',
  message,
  children,
  isVisible = false,
  CloseFunction,
}: BaseAlertProps) => {
  const {width} = useWindowDimensions();
  return (
    <BaseModal
      isAlert={true}
      style={{...styles.centerItems}}
      CloseFunction={CloseFunction}
      isVisible={isVisible}
      showBlur={true}
      animationType="fade">
      <View
        style={{
          backgroundColor: colores.whiteTransparent,
          overflow: 'hidden',
          borderRadius: 20,
          ...styles.centerItems,
          paddingTop: 10,
          width: width * 0.8,
          maxWidth: 500,
        }}>
        <Text
          style={{
            ...styles.textTitle,
            marginTop: 5,
            textAlign: 'center',
            color: colores.plomo,
            fontWeight: '300',
          }}>
          {title}
        </Text>
        <Text
          style={{
            ...styles.textButton,
            marginBottom: 15,
            //marginBottom: 20,
            color: colores.negro,
            textAlign: 'center',
          }}>
          {message}
        </Text>
        {children}
      </View>
    </BaseModal>
  );
};
