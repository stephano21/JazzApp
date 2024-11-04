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
          color={colores.error}
          anyFunction={CloseFunction}></AlertButton>
        <AlertButton
          textOption="Aceptar"
          color={colores.success}
          anyFunction={OkFunction}></AlertButton>
      </View>
    </AlertBaseModal>
  );
};
