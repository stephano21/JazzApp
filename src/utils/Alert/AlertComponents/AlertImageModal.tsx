import React from 'react';
import {View, useWindowDimensions, Image} from 'react-native';
import {colores, iconos, styles} from '../../../theme/appTheme';
import {AlertBaseModal, BaseAlertProps} from './AlertBaseModal';
import {AlertButton} from './AlertButton';

interface Props extends BaseAlertProps {
  OkFunction: () => void;
  imagePath: string;
}
export const AlertImageModal = ({
  CloseFunction,
  OkFunction,
  title,
  message,
  imagePath,
  isVisible = false,
}: Props) => {
  const {width} = useWindowDimensions();
  return (
    <AlertBaseModal
      title={title}
      message={message}
      isVisible={isVisible}
      CloseFunction={CloseFunction}>
      <View
        style={{
          alignSelf: 'center',
          ...styles.sombra,
          overflow: 'hidden',
          marginBottom: 20,
        }}>
        <Image
          source={{
            uri: imagePath,
          }}
          style={{
            width: width / 2,
            height: width / 1.5,
          }}></Image>
      </View>
      <View style={{flexDirection: 'row'}}>
        <AlertButton
          textOption="Cancelar"
          color={colores.error}
          anyFunction={CloseFunction}></AlertButton>
        <AlertButton
          textOption="Aceptar"
          color={colores.primary}
          anyFunction={OkFunction}></AlertButton>
      </View>
    </AlertBaseModal>
  );
};
