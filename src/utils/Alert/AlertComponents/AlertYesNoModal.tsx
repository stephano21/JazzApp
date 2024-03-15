import React, {useState} from 'react';
import {View} from 'react-native';
import {colores, iconos} from '../../../theme/appTheme';
import {AlertBaseModal, BaseAlertProps} from './AlertBaseModal';
import {AlertButton} from './AlertButton';
interface Props extends BaseAlertProps {
  OkFunction: () => void;
}
export const AlertYesNoModal = ({
  CloseFunction,
  OkFunction,
  title,
  message,
  isVisible = false,
}: Props) => {
  return (
    <AlertBaseModal
      title={title}
      message={message}
      isVisible={isVisible}
      CloseFunction={CloseFunction}>
      <View style={{flexDirection: 'row'}}>
        <AlertButton
          textOption="Cancelar"
          color={colores.rojo}
          anyFunction={CloseFunction}></AlertButton>
        <AlertButton
          textOption="Aceptar"
          color={colores.azul}
          anyFunction={OkFunction}></AlertButton>
      </View>
    </AlertBaseModal>
  );
};
