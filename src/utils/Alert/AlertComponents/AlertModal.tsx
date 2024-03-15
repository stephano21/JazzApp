import React from 'react';
import {View} from 'react-native';
import {AlertBaseModal, BaseAlertProps} from './AlertBaseModal';
import {colores} from '../../../theme/appTheme';
import {AlertButton} from './AlertButton';

interface Props extends BaseAlertProps {}
export const AlertModal = ({
  CloseFunction,
  title = 'Aviso',
  message,
  isVisible = false,
}: Props) => {
  return (
    <AlertBaseModal
      title={title}
      message={message}
      isVisible={isVisible}
      CloseFunction={CloseFunction}>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <AlertButton
          color={colores.azul}
          textOption="Aceptar"
          anyFunction={CloseFunction}></AlertButton>
      </View>
    </AlertBaseModal>
  );
};
